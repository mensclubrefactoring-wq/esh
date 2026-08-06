import pptxgen from 'pptxgenjs';
import { PitchSlide } from '../types';

export const exportToPptx = async (slides: PitchSlide[]) => {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Семейная лаборатория';
  pptx.title = 'Презентация проекта «Черновик»';

  slides.forEach((slide) => {
    const s = pptx.addSlide();

    // Background color (Warm cream)
    s.background = { color: 'FAF6F0' };

    // Top Header Banner
    s.addShape(pptx.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.7,
      fill: { color: 'D96B27' },
    });

    s.addText(`${slide.part} | Слайд ${slide.id} из ${slides.length}`, {
      x: 0.4,
      y: 0.15,
      w: 12.0,
      h: 0.4,
      fontSize: 13,
      color: 'FFFFFF',
      bold: true,
      fontFace: 'Arial',
    });

    // Title & Subtitle
    s.addText(slide.title, {
      x: 0.4,
      y: 0.85,
      w: 12.0,
      h: 0.5,
      fontSize: 22,
      bold: true,
      color: '29221D',
      fontFace: 'Arial',
    });

    s.addText(slide.subtitle, {
      x: 0.4,
      y: 1.35,
      w: 12.0,
      h: 0.4,
      fontSize: 13,
      color: '786C62',
      fontFace: 'Arial',
    });

    let currentY = 1.85;

    // Hero Metric Box if present
    if (slide.heroMetric) {
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 0.4,
        y: currentY,
        w: 12.5,
        h: 1.0,
        fill: { color: 'FFFFFF' },
        line: { color: 'E8E2D8', width: 1 },
      });

      s.addText(slide.heroMetric.value, {
        x: 0.6,
        y: currentY + 0.1,
        w: 3.2,
        h: 0.8,
        fontSize: 30,
        bold: true,
        color: slide.heroMetric.isProblem ? 'C0392B' : '15803D',
        fontFace: 'Arial',
      });

      s.addText(
        `${slide.heroMetric.label}${slide.heroMetric.subtext ? ` — ${slide.heroMetric.subtext}` : ''}`,
        {
          x: 3.8,
          y: currentY + 0.2,
          w: 8.8,
          h: 0.6,
          fontSize: 13,
          bold: true,
          color: '29221D',
          fontFace: 'Arial',
        }
      );

      currentY += 1.15;
    }

    // Bullet Points
    if (slide.bulletPoints && slide.bulletPoints.length > 0) {
      const formattedBullets = slide.bulletPoints.map((bp) => {
        return {
          text: bp.title ? `${bp.title}: ${bp.text}` : bp.text,
          options: {
            bullet: { type: 'bullet' },
            fontSize: 11,
            color: '29221D',
            spaceAfter: 5,
          },
        };
      });

      s.addText(formattedBullets, {
        x: 0.4,
        y: currentY,
        w: 12.5,
        h: 2.1,
        fontFace: 'Arial',
      });

      currentY += 2.15;
    }

    // Table Data if present
    if (slide.tableData && slide.tableData.length > 0) {
      const tableRows = [
        [{ text: 'Гипотеза', options: { bold: true, fill: { color: 'D96B27' }, color: 'FFFFFF' } },
         { text: 'Признак успеха', options: { bold: true, fill: { color: 'D96B27' }, color: 'FFFFFF' } }],
        ...slide.tableData.map((row) => [
          { text: row.col1, options: { fontSize: 10, fill: { color: 'FFFFFF' } } },
          { text: row.col2, options: { fontSize: 10, fill: { color: 'F5EFE6' } } },
        ]),
      ];

      s.addTable(tableRows, {
        x: 0.4,
        y: currentY,
        w: 12.5,
        colW: [6.2, 6.3],
        border: { pt: 1, color: 'E8E2D8' },
      });

      currentY += 1.6;
    }

    // Callout Box
    if (slide.callout) {
      const calloutY = Math.min(currentY, 5.7);
      s.addShape(pptx.shapes.RECTANGLE, {
        x: 0.4,
        y: calloutY,
        w: 12.5,
        h: 1.0,
        fill: { color: 'F5EFE6' },
        line: { color: 'D96B27', width: 1 },
      });

      s.addText(
        `💡 ${slide.callout.title}: ${slide.callout.text}`,
        {
          x: 0.6,
          y: calloutY + 0.1,
          w: 12.0,
          h: 0.8,
          fontSize: 11,
          bold: false,
          color: '29221D',
          fontFace: 'Arial',
        }
      );
    }

    // Speaker Notes
    if (slide.speakerNotes) {
      s.addNotes(slide.speakerNotes);
    }
  });

  await pptx.writeFile({ fileName: 'Презентация_Черновик_Семейная_Лаборатория.pptx' });
};
