import pptxgen from 'pptxgenjs';
import { PitchSlide } from '../types';

/**
 * Converts image relative URL to Base64 data string for embedded PPTX images
 */
async function getBase64Image(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
    const response = await fetch(fullUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Failed to load image for PPTX export:', url, e);
    return null;
  }
}

export const exportToPptx = async (slides: PitchSlide[]) => {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Семейная лаборатория';
  pptx.title = 'Презентация проекта «Черновик»';

  // Pre-fetch all images as base64 to ensure offline embedding in PPTX
  const imageMap = new Map<string, string | null>();
  await Promise.all(
    slides.map(async (slide) => {
      if (slide.imageUrl && !imageMap.has(slide.imageUrl)) {
        const base64 = await getBase64Image(slide.imageUrl);
        imageMap.set(slide.imageUrl, base64);
      }
    })
  );

  slides.forEach((slide) => {
    const s = pptx.addSlide();

    // Background color (Warm cream)
    s.background = { color: 'FAF6F0' };

    // 1. Top Header Banner
    s.addShape(pptx.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 13.333,
      h: 0.6,
      fill: { color: 'D96B27' },
    });

    s.addText(`${slide.part.toUpperCase()} | СЛАЙД ${slide.id < 10 ? '0' + slide.id : slide.id} ИЗ ${slides.length}`, {
      x: 0.5,
      y: 0.12,
      w: 12.333,
      h: 0.35,
      fontSize: 11,
      color: 'FFFFFF',
      bold: true,
      fontFace: 'Arial',
    });

    // 2. Title & Subtitle
    s.addText(slide.title, {
      x: 0.5,
      y: 0.75,
      w: 12.333,
      h: 0.45,
      fontSize: 20,
      bold: true,
      color: '29221D',
      fontFace: 'Arial',
    });

    s.addText(slide.subtitle, {
      x: 0.5,
      y: 1.2,
      w: 12.333,
      h: 0.35,
      fontSize: 12,
      color: '786C62',
      fontFace: 'Arial',
    });

    // -------------------------------------------------------------------
    // LEFT COLUMN (x = 0.5, width = 6.4 inches, y = 1.7 to 6.8)
    // -------------------------------------------------------------------
    let leftY = 1.7;

    // Bullet Points Block
    if (slide.bulletPoints && slide.bulletPoints.length > 0) {
      const formattedBullets: any[] = [];
      slide.bulletPoints.forEach((bp) => {
        if (bp.title) {
          formattedBullets.push({
            text: `${bp.title}: `,
            options: { bold: true, color: '29221D', fontSize: 11, fontFace: 'Arial' },
          });
        }
        formattedBullets.push({
          text: `${bp.text}\n`,
          options: { bold: false, color: '4A3E37', fontSize: 11, fontFace: 'Arial', spaceAfter: 6 },
        });
      });

      const bulletsHeight = Math.min(2.8, slide.bulletPoints.length * 0.65);
      s.addText(formattedBullets, {
        x: 0.5,
        y: leftY,
        w: 6.4,
        h: bulletsHeight,
        bullet: { type: 'bullet' },
      });

      leftY += bulletsHeight + 0.15;
    }

    // Table Data Block (if present - e.g. Slide 10)
    if (slide.tableData && slide.tableData.length > 0) {
      const tableRows = [
        [
          { text: 'Гипотеза', options: { bold: true, fill: { color: 'D96B27' }, color: 'FFFFFF', fontSize: 10 } },
          { text: 'Признак успеха', options: { bold: true, fill: { color: 'D96B27' }, color: 'FFFFFF', fontSize: 10 } },
        ],
        ...slide.tableData.map((row) => [
          { text: row.col1, options: { fontSize: 9, fill: { color: 'FFFFFF' }, color: '29221D' } },
          { text: `✓ ${row.col2}`, options: { fontSize: 9, fill: { color: 'F5EFE6' }, color: '15803D', bold: true } },
        ]),
      ];

      s.addTable(tableRows, {
        x: 0.5,
        y: leftY,
        w: 6.4,
        colW: [3.1, 3.3],
        border: { pt: 1, color: 'E8E2D8' },
      });

      leftY += 1.6;
    }

    // Callout Box Block
    if (slide.callout) {
      const calloutY = Math.max(leftY, 5.3);
      const isWarning = slide.callout.type === 'warning';
      const isSolution = slide.callout.type === 'solution';

      const boxFill = isWarning ? 'FFF5F5' : isSolution ? 'F0FDF4' : 'FEF3C7';
      const boxBorder = isWarning ? 'C0392B' : isSolution ? '15803D' : 'D96B27';
      const icon = isWarning ? '⚠️' : isSolution ? '✅' : '💡';

      s.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5,
        y: calloutY,
        w: 6.4,
        h: 1.3,
        fill: { color: boxFill },
        line: { color: boxBorder, width: 1 },
      });

      s.addText(
        [
          {
            text: `${icon} ${slide.callout.title.toUpperCase()}\n`,
            options: { bold: true, fontSize: 10, color: boxBorder, fontFace: 'Arial' },
          },
          {
            text: slide.callout.text,
            options: { fontSize: 10, color: '29221D', fontFace: 'Arial' },
          },
        ],
        {
          x: 0.65,
          y: calloutY + 0.1,
          w: 6.1,
          h: 1.1,
        }
      );
    }

    // -------------------------------------------------------------------
    // RIGHT COLUMN (x = 7.2, width = 5.6 inches, y = 1.7 to 6.8)
    // -------------------------------------------------------------------
    let rightY = 1.7;

    // 1. Hero Metric Card Box
    if (slide.heroMetric) {
      const metricColor = slide.heroMetric.isProblem ? 'C0392B' : 'D96B27';

      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.2,
        y: rightY,
        w: 5.6,
        h: 1.6,
        fill: { color: 'FFFFFF' },
        line: { color: 'E8E2D8', width: 1 },
      });

      s.addText('КЛЮЧЕВОЙ ПОКАЗАТЕЛЬ', {
        x: 7.4,
        y: rightY + 0.1,
        w: 5.2,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: '786C62',
        fontFace: 'Arial',
      });

      s.addText(slide.heroMetric.value, {
        x: 7.4,
        y: rightY + 0.35,
        w: 5.2,
        h: 0.6,
        fontSize: 32,
        bold: true,
        color: metricColor,
        fontFace: 'Arial',
      });

      s.addText(
        `${slide.heroMetric.label}${slide.heroMetric.subtext ? ` — ${slide.heroMetric.subtext}` : ''}`,
        {
          x: 7.4,
          y: rightY + 0.95,
          w: 5.2,
          h: 0.55,
          fontSize: 10,
          bold: true,
          color: '29221D',
          fontFace: 'Arial',
        }
      );

      rightY += 1.8;
    }

    // 2. Photo / Drawing Image Box
    if (slide.imageUrl) {
      const base64Data = imageMap.get(slide.imageUrl);
      const imgY = rightY;
      const imgHeight = 2.2;

      // Background Card Frame for Image
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.2,
        y: imgY,
        w: 5.6,
        h: 2.7,
        fill: { color: 'F5EFE6' },
        line: { color: 'E8E2D8', width: 1 },
      });

      if (base64Data) {
        s.addImage({
          data: base64Data,
          x: 7.2,
          y: imgY,
          w: 5.6,
          h: imgHeight,
        });
      }

      // Dark Overlay Caption Box at Bottom
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.2,
        y: imgY + imgHeight,
        w: 5.6,
        h: 0.5,
        fill: { color: '29221D' },
      });

      s.addText(`🎨 ${slide.imageCaption || 'Детский рисунок: «Черновик»'}`, {
        x: 7.35,
        y: imgY + imgHeight + 0.08,
        w: 5.3,
        h: 0.35,
        fontSize: 9,
        color: 'FFFFFF',
        italic: true,
        fontFace: 'Arial',
      });

      rightY += 2.9;
    }

    // 3. Special Coordinate Plane Visualization for Slide 9 ("Я" vs "МЫ")
    if (slide.id === 9) {
      const coordY = 3.5;

      // Main Outer Frame
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.2,
        y: coordY,
        w: 5.6,
        h: 3.2,
        fill: { color: 'FFFFFF' },
        line: { color: 'E8E2D8', width: 1 },
      });

      s.addText('КООРДИНАТНАЯ ПЛОСКОСТЬ «Я» vs «МЫ»', {
        x: 7.4,
        y: coordY + 0.1,
        w: 5.2,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: '29221D',
        fontFace: 'Arial',
      });

      // Inner Plane Box
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.4,
        y: coordY + 0.45,
        w: 5.2,
        h: 2.2,
        fill: { color: 'F5EFE6' },
        line: { color: 'D8CFC4', width: 1 },
      });

      // Axis Lines
      // Horizontal
      s.addShape(pptx.shapes.LINE, {
        x: 7.4,
        y: coordY + 1.55,
        w: 5.2,
        h: 0,
        line: { color: 'D8CFC4', width: 2 },
      });
      // Vertical
      s.addShape(pptx.shapes.LINE, {
        x: 10.0,
        y: coordY + 0.45,
        w: 0,
        h: 2.2,
        line: { color: 'D8CFC4', width: 2 },
      });

      // Axis Labels
      s.addText('«Я» (Карьера / Творчество)', {
        x: 7.5,
        y: coordY + 0.5,
        w: 2.4,
        h: 0.3,
        fontSize: 8,
        bold: true,
        color: '786C62',
      });

      s.addText('«МЫ» (Семья / Дети)', {
        x: 10.1,
        y: coordY + 2.3,
        w: 2.4,
        h: 0.3,
        fontSize: 8,
        bold: true,
        color: 'D96B27',
      });

      // Sweet Spot Badge Box
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 10.2,
        y: coordY + 0.55,
        w: 2.2,
        h: 0.4,
        fill: { color: 'DCFCE7' },
        line: { color: '15803D', width: 1 },
      });

      s.addText('✓ Оптимум лаборатории', {
        x: 10.2,
        y: coordY + 0.6,
        w: 2.2,
        h: 0.3,
        fontSize: 8,
        bold: true,
        color: '15803D',
        align: 'center',
      });

      // Plot Points
      // Red Dot (Before Game)
      s.addShape(pptx.shapes.OVAL, {
        x: 8.0,
        y: coordY + 1.8,
        w: 0.2,
        h: 0.2,
        fill: { color: 'C0392B' },
      });
      s.addText('До игры (паника)', {
        x: 7.5,
        y: coordY + 2.0,
        w: 1.5,
        h: 0.25,
        fontSize: 7,
        color: 'C0392B',
      });

      // Orange Dot (In Game "Черновик")
      s.addShape(pptx.shapes.OVAL, {
        x: 11.2,
        y: coordY + 1.1,
        w: 0.25,
        h: 0.25,
        fill: { color: 'D96B27' },
      });
      s.addText('Черновик', {
        x: 10.8,
        y: coordY + 1.35,
        w: 1.2,
        h: 0.25,
        fontSize: 8,
        bold: true,
        color: 'D96B27',
      });

      // Bottom Note
      s.addText('Практика «Красных часов» восстанавливает обе оси без жертв', {
        x: 7.4,
        y: coordY + 2.7,
        w: 5.2,
        h: 0.35,
        fontSize: 8,
        color: '786C62',
        align: 'center',
      });
    }

    // 4. Speaker Notes
    if (slide.speakerNotes) {
      s.addNotes(slide.speakerNotes);
    }
  });

  await pptx.writeFile({ fileName: 'Презентация_Черновик_Семейная_Лаборатория.pptx' });
};
