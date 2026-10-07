import {generatePDF} from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import {AstrologyResult, Profile} from '../types';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[character] ?? character));

export async function createAndShareKundliReport(profile: Profile, result: AstrologyResult) {
  const safeName = profile.name.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'kundli';
  const today = new Date().toLocaleDateString('en-IN', {day: 'numeric', month: 'long', year: 'numeric'});
  const sectionHtml = result.sections.map(section => `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></section>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"/><style>
    @page { size: A4; margin: 40px; } body { font-family: Arial, sans-serif; color: #261E2B; }
    .header { background: #34213F; color: #fff; padding: 28px; border-radius: 14px; }
    .eyebrow { color: #E3B36D; font-size: 11px; letter-spacing: 2px; }
    h1 { margin: 12px 0 6px; font-size: 26px; } .muted { color: #827987; }
    section { border-bottom: 1px solid #E9E2EA; padding: 10px 2px; } h2 { color: #4C315F; font-size: 17px; }
    p { line-height: 1.55; } .footer { margin-top: 24px; color: #827987; font-size: 10px; }
  </style></head><body>
    <div class="header"><div class="eyebrow">ASTRO ANJAN · SAMPLE REPORT</div><h1>${escapeHtml(profile.name)}'s Kundli</h1><div>${escapeHtml(result.subtitle)}</div></div>
    <p class="muted">Prepared ${today}${profile.birthLocation ? ` · ${escapeHtml(profile.birthLocation)}` : ''}${profile.dateOfBirth ? ` · ${escapeHtml(profile.dateOfBirth)}` : ''}${profile.timeOfBirth ? ` at ${escapeHtml(profile.timeOfBirth)}` : ''}</p>
    <h2>Overview</h2><p>${escapeHtml(result.summary)}</p>${sectionHtml}
    <p class="footer">This report contains illustrative demo content. It is not an astronomical calculation or personal advice.</p>
  </body></html>`;

  const file = await generatePDF({html, fileName: `${safeName}-kundli-${Date.now()}`, directory: 'AstroAnjan', width: 595, height: 842, padding: 32});
  await Share.open({
    url: file.filePath.startsWith('file://') ? file.filePath : `file://${file.filePath}`,
    type: 'application/pdf',
    title: 'Share Kundli report',
    subject: `${profile.name}'s Kundli report`,
    failOnCancel: false,
  });
  return file.filePath;
}
