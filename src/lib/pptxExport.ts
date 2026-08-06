import pptxgen from 'pptxgenjs';
import { PitchSlide } from '../types';

/**
 * Converts image relative URL to Base64 data string for embedded PPTX images
 */
async function getBase64Image(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    const fullUrl = url.startsWith('http') ? url : window.location.origin + url;
    const response = await fetch(fullUrl, { mode: 'cors' });
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

  pptx.layout = 'LAYOUT_16x9'; // 13.333" x 7.5"
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

    // 1. Top Header Banner (0.5" height)
    s.addShape(pptx.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 13.333,
      h: 0.5,
      fill: { color: 'D96B27' },
      line: { color: 'D96B27' },
    });

    s.addText(
      `${slide.part.toUpperCase()} | СЛАЙД ${slide.id < 10 ? '0' + slide.id : slide.id} ИЗ ${slides.length}`,
      {
        x: 0.5,
        y: 0.08,
        w: 12.333,
        h: 0.35,
        fontSize: 10,
        color: 'FFFFFF',
        bold: true,
        fontFace: 'Arial',
      }
    );

    // 2. Title & Subtitle
    s.addText(slide.title, {
      x: 0.5,
      y: 0.62,
      w: 12.333,
      h: 0.45,
      fontSize: 18,
      bold: true,
      color: '29221D',
      fontFace: 'Arial',
    });

    s.addText(slide.subtitle, {
      x: 0.5,
      y: 1.05,
      w: 12.333,
      h: 0.35,
      fontSize: 11,
      color: '786C62',
      fontFace: 'Arial',
    });

    // -------------------------------------------------------------------
    // LEFT COLUMN (x = 0.5, width = 6.3 inches, available Y = 1.5 to 7.0)
    // -------------------------------------------------------------------
    let leftY = 1.5;

    // Bullet Points Block
    if (slide.bulletPoints && slide.bulletPoints.length > 0) {
      const formattedBullets: any[] = [];
      slide.bulletPoints.forEach((bp) => {
        if (bp.title) {
          formattedBullets.push({
            text: `${bp.title}: `,
            options: { bold: true, color: '29221D', fontSize: 10, fontFace: 'Arial' },
          });
        }
        formattedBullets.push({
          text: `${bp.text}\n`,
          options: { bold: false, color: '4A3E37', fontSize: 10, fontFace: 'Arial', spaceAfter: 5 },
        });
      });

      const bulletsHeight = Math.min(3.2, slide.bulletPoints.length * 0.7);
      s.addText(formattedBullets, {
        x: 0.5,
        y: leftY,
        w: 6.3,
        h: bulletsHeight,
        bullet: { type: 'bullet' },
      });

      leftY += bulletsHeight + 0.1;
    }

    // Table Data Block (if present)
    if (slide.tableData && slide.tableData.length > 0) {
      const tableRows = [
        [
          { text: 'Гипотеза / Покащатель', options: { bold: true, fill: { color: 'D96B27' }, color: 'FFFFFF', fontSize: 9 } },
          { text: 'Признак успеха / Результат', options: { bold: true, fill: { color: 'D96B27' }, color: 'FFFFFF', fontSize: 9 } },
        ],
        ...slide.tableData.map((row) => [
          { text: row.col1, options: { fontSize: 8.5, fill: { color: 'FFFFFF' }, color: '29221D' } },
          { text: `✓ ${row.col2}`, options: { fontSize: 8.5, fill: { color: 'F5EFE6' }, color: '15803D', bold: true } },
        ]),
      ];

      const tableHeight = (slide.tableData.length + 1) * 0.38;
      s.addTable(tableRows, {
        x: 0.5,
        y: leftY,
        w: 6.3,
        colW: [3.15, 3.15],
        border: { pt: 1, color: 'E8E2D8' },
      });

      leftY += tableHeight + 0.1;
    }

    // Callout Box Block (Always position nicely without cutoff)
    if (slide.callout) {
      const calloutY = Math.min(Math.max(leftY, 5.2), 5.6);
      const isWarning = slide.callout.type === 'warning';
      const isSolution = slide.callout.type === 'solution';

      const boxFill = isWarning ? 'FFF5F5' : isSolution ? 'F0FDF4' : 'FEF3C7';
      const boxBorder = isWarning ? 'C0392B' : isSolution ? '15803D' : 'D96B27';
      const icon = isWarning ? '⚠️' : isSolution ? '✅' : '💡';

      s.addShape(pptx.shapes.RECTANGLE, {
        x: 0.5,
        y: calloutY,
        w: 6.3,
        h: 1.3,
        fill: { color: boxFill },
        line: { color: boxBorder, width: 1 },
      });

      s.addText(
        [
          {
            text: `${icon} ${slide.callout.title.toUpperCase()}\n`,
            options: { bold: true, fontSize: 9.5, color: boxBorder, fontFace: 'Arial' },
          },
          {
            text: slide.callout.text,
            options: { fontSize: 9.5, color: '29221D', fontFace: 'Arial' },
          },
        ],
        {
          x: 0.65,
          y: calloutY + 0.08,
          w: 6.0,
          h: 1.15,
        }
      );
    }

    // -------------------------------------------------------------------
    // RIGHT COLUMN (x = 7.0, width = 5.8 inches, available Y = 1.5 to 7.0)
    // -------------------------------------------------------------------
    let rightY = 1.5;

    // 1. Hero Metric Card Box
    if (slide.heroMetric) {
      const metricColor = slide.heroMetric.isProblem ? 'C0392B' : 'D96B27';

      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.0,
        y: rightY,
        w: 5.8,
        h: 1.45,
        fill: { color: 'FFFFFF' },
        line: { color: 'E8E2D8', width: 1 },
      });

      s.addText('КЛЮЧЕВОЙ ПОКАЗАТЕЛЬ', {
        x: 7.2,
        y: rightY + 0.08,
        w: 5.4,
        h: 0.22,
        fontSize: 8.5,
        bold: true,
        color: '786C62',
        fontFace: 'Arial',
      });

      s.addText(slide.heroMetric.value, {
        x: 7.2,
        y: rightY + 0.28,
        w: 5.4,
        h: 0.55,
        fontSize: 28,
        bold: true,
        color: metricColor,
        fontFace: 'Arial',
      });

      s.addText(
        `${slide.heroMetric.label}${slide.heroMetric.subtext ? ` — ${slide.heroMetric.subtext}` : ''}`,
        {
          x: 7.2,
          y: rightY + 0.85,
          w: 5.4,
          h: 0.5,
          fontSize: 9.5,
          bold: true,
          color: '29221D',
          fontFace: 'Arial',
        }
      );

      rightY += 1.55;
    }

    // 2. Photo / Drawing Image Box
    if (slide.imageUrl) {
      const base64Data = imageMap.get(slide.imageUrl);
      const imgY = rightY;
      const imgHeight = slide.heroMetric ? 2.2 : 3.4;

      // Outer Frame
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.0,
        y: imgY,
        w: 5.8,
        h: imgHeight + 0.45,
        fill: { color: 'F5EFE6' },
        line: { color: 'E8E2D8', width: 1 },
      });

      // Image
      if (base64Data) {
        s.addImage({
          data: base64Data,
          x: 7.0,
          y: imgY,
          w: 5.8,
          h: imgHeight,
        });
      }

      // Dark Overlay Caption Box
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.0,
        y: imgY + imgHeight,
        w: 5.8,
        h: 0.45,
        fill: { color: '29221D' },
      });

      s.addText(`🎨 ${slide.imageCaption || 'Детский рисунок: «Черновик»'}`, {
        x: 7.15,
        y: imgY + imgHeight + 0.08,
        w: 5.5,
        h: 0.3,
        fontSize: 8.5,
        color: 'FFFFFF',
        italic: true,
        fontFace: 'Arial',
      });

      rightY += imgHeight + 0.55;
    }

    // 3. Coordinate Plane Visualization (Slide 11 or title match)
    if (slide.title.includes('Координаты') || slide.id === 11) {
      const coordY = Math.max(rightY, 3.1);

      // Main Frame
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.0,
        y: coordY,
        w: 5.8,
        h: 3.2,
        fill: { color: 'FFFFFF' },
        line: { color: 'E8E2D8', width: 1 },
      });

      s.addText('КООРДИНАТНАЯ ПЛОСКОСТЬ «Я» vs «МЫ»', {
        x: 7.2,
        y: coordY + 0.1,
        w: 5.4,
        h: 0.28,
        fontSize: 9.5,
        bold: true,
        color: '29221D',
        fontFace: 'Arial',
      });

      // Inner Plane Area
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 7.2,
        y: coordY + 0.42,
        w: 5.4,
        h: 2.2,
        fill: { color: 'F5EFE6' },
        line: { color: 'D8CFC4', width: 1 },
      });

      // Axes
      s.addShape(pptx.shapes.LINE, {
        x: 7.2,
        y: coordY + 1.52,
        w: 5.4,
        h: 0,
        line: { color: 'D8CFC4', width: 2 },
      });

      s.addShape(pptx.shapes.LINE, {
        x: 9.9,
        y: coordY + 0.42,
        w: 0,
        h: 2.2,
        line: { color: 'D8CFC4', width: 2 },
      });

      // Axis Labels
      s.addText('«Я» (Карьера / Творчество)', {
        x: 7.3,
        y: coordY + 0.48,
        w: 2.5,
        h: 0.28,
        fontSize: 8,
        bold: true,
        color: '786C62',
      });

      s.addText('«МЫ» (Семья / Дети)', {
        x: 10.0,
        y: coordY + 2.28,
        w: 2.5,
        h: 0.28,
        fontSize: 8,
        bold: true,
        color: 'D96B27',
      });

      // Badge Box
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 10.1,
        y: coordY + 0.52,
        w: 2.3,
        h: 0.38,
        fill: { color: 'DCFCE7' },
        line: { color: '15803D', width: 1 },
      });

      s.addText('✓ Оптимум лаборатории', {
        x: 10.1,
        y: coordY + 0.56,
        w: 2.3,
        h: 0.3,
        fontSize: 8,
        bold: true,
        color: '15803D',
        align: 'center',
      });

      // Plot Points
      s.addShape(pptx.shapes.OVAL, {
        x: 7.8,
        y: coordY + 1.8,
        w: 0.2,
        h: 0.2,
        fill: { color: 'C0392B' },
      });
      s.addText('До игры (паника)', {
        x: 7.3,
        y: coordY + 2.02,
        w: 1.5,
        h: 0.22,
        fontSize: 7.5,
        color: 'C0392B',
      });

      s.addShape(pptx.shapes.OVAL, {
        x: 11.1,
        y: coordY + 1.1,
        w: 0.24,
        h: 0.24,
        fill: { color: 'D96B27' },
      });
      s.addText('Черновик', {
        x: 10.7,
        y: coordY + 1.35,
        w: 1.2,
        h: 0.22,
        fontSize: 8,
        bold: true,
        color: 'D96B27',
      });

      // Note at bottom
      s.addText('Практика «Красных часов» восстанавливает обе оси без жертв', {
        x: 7.2,
        y: coordY + 2.68,
        w: 5.4,
        h: 0.3,
        fontSize: 8,
        color: '786C62',
        align: 'center',
      });
    }

    // 4. Speaker Notes (Always export speaker notes cleanly)
    if (slide.speakerNotes) {
      s.addNotes(slide.speakerNotes);
    }
  });

  await pptx.writeFile({ fileName: 'Презентация_Черновик_Семейная_Лаборатория.pptx' });
};
