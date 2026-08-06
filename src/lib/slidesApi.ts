import { SlideData } from '../types';

export interface CreatePresentationResult {
  presentationId: string;
  presentationUrl: string;
}

export async function createGoogleSlidesDeck(
  accessToken: string,
  slides: SlideData[]
): Promise<CreatePresentationResult> {
  // Step 1: Create a new presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Семейная лаборатория: Проблема → Решение (Пилот)',
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Ошибка создания презентации Google Slides: ${errorText}`);
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;
  const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;

  // Step 2: Build batchUpdate requests for the slides
  const requests: any[] = [];

  // Create slides for each slide item
  slides.forEach((slide, index) => {
    const slideObjectId = `slide_${index + 1}`;

    // Create Slide
    requests.push({
      createSlide: {
        objectId: slideObjectId,
        insertionIndex: index,
        slideLayoutReference: {
          predefinedLayout: 'BLANK',
        },
      },
    });

    // Header shape (top banner accent)
    const headerShapeId = `header_bg_${index + 1}`;
    requests.push({
      createShape: {
        objectId: headerShapeId,
        shapeType: 'RECTANGLE',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 720, unit: 'PT' },
            height: { magnitude: 55, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 0,
            unit: 'PT',
          },
        },
      },
    });

    // Style Header background
    requests.push({
      updateShapeProperties: {
        objectId: headerShapeId,
        shapeProperties: {
          shapeBackgroundFill: {
            solidFill: {
              color: {
                rgbColor: { red: 0.85, green: 0.42, blue: 0.15 }, // Warm Orange accent
              },
            },
          },
          outline: { propertyState: 'NOT_SET' },
        },
        fields: 'shapeBackgroundFill,outline',
      },
    });

    // Header Text
    const headerTextId = `header_text_${index + 1}`;
    requests.push({
      createShape: {
        objectId: headerTextId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 700, unit: 'PT' },
            height: { magnitude: 40, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 20,
            translateY: 8,
            unit: 'PT',
          },
        },
      },
    });

    const partHeader = `${slide.part} | Слайд ${slide.id} из ${slides.length}`;
    requests.push({
      insertText: {
        objectId: headerTextId,
        text: partHeader,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: headerTextId,
        style: {
          foregroundColor: {
            opaqueColor: { rgbColor: { red: 1.0, green: 1.0, blue: 1.0 } },
          },
          fontSize: { magnitude: 12, unit: 'PT' },
          bold: true,
          fontFamily: 'Roboto',
        },
        fields: 'foregroundColor,fontSize,bold,fontFamily',
      },
    });

    // Main Title Box
    const titleBoxId = `title_${index + 1}`;
    requests.push({
      createShape: {
        objectId: titleBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 680, unit: 'PT' },
            height: { magnitude: 45, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 20,
            translateY: 65,
            unit: 'PT',
          },
        },
      },
    });

    requests.push({
      insertText: {
        objectId: titleBoxId,
        text: slide.title,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: titleBoxId,
        style: {
          foregroundColor: {
            opaqueColor: { rgbColor: { red: 0.16, green: 0.13, blue: 0.11 } },
          },
          fontSize: { magnitude: 22, unit: 'PT' },
          bold: true,
          fontFamily: 'Roboto',
        },
        fields: 'foregroundColor,fontSize,bold,fontFamily',
      },
    });

    // Subtitle / Body Content
    const bodyBoxId = `body_${index + 1}`;
    requests.push({
      createShape: {
        objectId: bodyBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 680, unit: 'PT' },
            height: { magnitude: 260, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 20,
            translateY: 115,
            unit: 'PT',
          },
        },
      },
    });

    let bodyContentText = `${slide.subtitle}\n\n`;

    if (slide.heroMetric) {
      bodyContentText += `📊 КЛЮЧЕВОЙ ПОКАЗАТЕЛЬ: ${slide.heroMetric.value} — ${slide.heroMetric.label}`;
      if (slide.heroMetric.subtext) {
        bodyContentText += ` (${slide.heroMetric.subtext})`;
      }
      bodyContentText += `\n\n`;
    }

    if (slide.bulletPoints && slide.bulletPoints.length > 0) {
      slide.bulletPoints.forEach((bp) => {
        if (bp.title) {
          bodyContentText += `• ${bp.title}: ${bp.text}\n`;
        } else {
          bodyContentText += `• ${bp.text}\n`;
        }
      });
    }

    if (slide.tableData && slide.tableData.length > 0) {
      bodyContentText += `\n📋 ГИПОТЕЗЫ И ПРИЗНАКИ УСПЕХА:\n`;
      slide.tableData.forEach((row, rIdx) => {
        bodyContentText += `Гипотеза ${rIdx + 1}: ${row.col1}\n   ✓ Признак успеха: ${row.col2}\n`;
      });
    }

    if (slide.callout) {
      bodyContentText += `\n💡 [${slide.callout.title}]\n${slide.callout.text}\n`;
    }

    if (slide.speakerNotes) {
      bodyContentText += `\n📝 Заметки спикера:\n${slide.speakerNotes}\n`;
    }

    requests.push({
      insertText: {
        objectId: bodyBoxId,
        text: bodyContentText,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: bodyBoxId,
        style: {
          foregroundColor: {
            opaqueColor: { rgbColor: { red: 0.25, green: 0.22, blue: 0.2 } },
          },
          fontSize: { magnitude: 11, unit: 'PT' },
          fontFamily: 'Roboto',
        },
        fields: 'foregroundColor,fontSize,fontFamily',
      },
    });
  });

  // Remove default initial slide AFTER creating new slides (Google Slides API requires >=1 slide at all times)
  if (presentation.slides && presentation.slides.length > 0) {
    requests.push({
      deleteObject: {
        objectId: presentation.slides[0].objectId,
      },
    });
  }

  // Execute batchUpdate
  const batchRes = await fetch(`https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  });

  if (!batchRes.ok) {
    const errorText = await batchRes.text();
    console.error('Batch update error:', errorText);
    throw new Error(`Ошибка оформления слайдов: ${errorText}`);
  }

  return { presentationId, presentationUrl };
}

