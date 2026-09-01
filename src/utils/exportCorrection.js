/**
 * Módulo de Exportação Oficial de Correções da RedaLine
 * Reutiliza exatamente o mesmo padrão visual, HTML e CSS de impressão do RedacaoVisualizacao.tsx
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const COMPETENCY_METAS = [
  { code: 'C1', num: '01', key: 'score_c1', name: 'Norma Culta', desc: 'Domínio da modalidade escrita formal' },
  { code: 'C2', num: '02', key: 'score_c2', name: 'Compreensão do Tema', desc: 'Compreensão da proposta e repertório sociocultural' },
  { code: 'C3', num: '03', key: 'score_c3', name: 'Argumentação', desc: 'Seleção, relação e organização de informações' },
  { code: 'C4', num: '04', key: 'score_c4', name: 'Coesão e Coerência', desc: 'Mecanismos linguísticos de coesão' },
  { code: 'C5', num: '05', key: 'score_c5', name: 'Proposta de Intervenção', desc: 'Elaboração de proposta para o problema' },
];

/**
 * Gera o relatório completo em PDF / Impressão no padrão oficial RedaLine (A4)
 */
export async function exportToPdf(leadData) {
  if (!leadData) return;

  const studentName = leadData.name || 'Estudante';
  const theme = leadData.theme || 'Tema não especificado';
  const formattedDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const totalScore = leadData.score_total ?? 0;
  const essayText = leadData.essay_text || '';
  const resultObj = leadData.result || {};
  const analiseGemini = resultObj.analiseGemini || {};
  const issues = Array.isArray(resultObj.issues) ? resultObj.issues : [];
  const alineeQualitativa = analiseGemini.analiseQualitativa || 'Correção pedagógica realizada com critérios oficiais do ENEM.';
  const sugestoes = Array.isArray(analiseGemini.sugestoesDetalhadas) ? analiseGemini.sugestoesDetalhadas : [];

  // Montagem dos cards das 5 competências no padrão RedacaoVisualizacao
  const competencyCardsHtml = COMPETENCY_METAS.map((comp) => {
    const score = Number(leadData[comp.key] ?? 0);
    const compKey = `competencia${comp.num.replace(/^0/, '')}`;
    const compData = analiseGemini[compKey] || {};
    const cColorClass = comp.code.toLowerCase();
    const isPontoForte = score >= 160;
    const thirdColTitle = isPontoForte ? '⭐ Ponto forte' : '💡 Como melhorar';
    const thirdColColorClass = isPontoForte ? 'text-blue' : 'text-purple';

    const groupIssues = issues.filter(
      (iss) => (iss.competency || '').toUpperCase() === comp.code || (iss.competency_enem || '').toUpperCase() === comp.code
    );

    const pontoForteTxt = compData.pontosFortes && compData.pontosFortes.length > 0 ? compData.pontosFortes[0] : null;
    const pontoFragilTxt = compData.pontosFrageis && compData.pontosFrageis.length > 0 ? compData.pontosFrageis[0] : null;
    const fallbackDiagnostico = `Desempenho avaliado em ${score}/200 na ${comp.name}.`;

    return `
      <article class="comp-card border-${cColorClass} bg-subtle-${cColorClass}">
        <div class="comp-card-col1">
          <div class="comp-header-label text-${cColorClass}">Competência</div>
          <div class="comp-number text-${cColorClass}">${comp.num}</div>
          <div class="comp-name">${escapeHtml(comp.name)}</div>
          <div class="comp-score bg-${cColorClass}">${score}/200</div>
        </div>
        <div class="comp-card-col2">
          <div class="comp-title text-blue">Pontos de atenção</div>
          ${groupIssues.length > 0 ? `
            <ul class="comp-issues-list">
              ${groupIssues.slice(0, 3).map((iss, idx) => `
                <li>
                  <span class="issue-idx bg-${cColorClass}">${idx + 1}</span>
                  <div class="issue-content">
                    <div><strong>Trecho:</strong> "${escapeHtml(iss.offending_text || iss.trecho || '...')}"</div>
                    <div><strong>Por quê:</strong> ${escapeHtml(iss.teacher_feedback || iss.comentario || '...') }</div>
                    ${iss.rewrite_suggestion ? `<div><strong>Sugestão:</strong> ${escapeHtml(iss.rewrite_suggestion)}</div>` : ''}
                  </div>
                </li>
              `).join('')}
            </ul>
          ` : '<p class="comp-empty">Nenhum desvio grave identificado nesta competência.</p>'}
        </div>
        <div class="comp-card-col3">
          <div class="comp-title ${thirdColColorClass}">${thirdColTitle}</div>
          <div class="comp-improve-text">
            ${escapeHtml(isPontoForte ? (pontoForteTxt || fallbackDiagnostico) : (pontoFragilTxt || fallbackDiagnostico))}
          </div>
          <div style="flex-grow: 1;"></div>
          <div class="comp-improve-btn bg-light-${cColorClass} text-dark-${cColorClass}">
            Critérios Oficiais ENEM
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Detalhamento de apontamentos
  const detailedIssuesHtml = issues.length > 0 ? `
    <section class="print-group" style="margin-top: 30px;">
      <div class="group-header" style="border-bottom: 2px solid #001B3D;">
        <h3 style="color: #001B3D;">APONTAMENTOS DETALHADOS NO TEXTO</h3>
        <span class="group-count">${issues.length} apontamento${issues.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="issue-list-detailed">
        ${issues.map((iss, idx) => `
          <div class="detailed-issue-card">
            <div class="detailed-header">
              <span class="detailed-num" style="background:#001B3D; color:#fff;">${idx + 1}</span>
              <span class="detailed-chip">Competência: ${escapeHtml(iss.competency || iss.competency_enem || 'Geral')}</span>
              <span class="detailed-chip">Categoria: ${escapeHtml(iss.category || iss.metodologia || 'Gramática')}</span>
              <span class="detailed-chip">Impacto: ${escapeHtml(iss.severity || 'Médio')}</span>
            </div>
            <div class="detailed-body">
              <div class="detailed-grid">
                ${iss.offending_text || iss.trecho ? `
                  <div class="detailed-grid-label">Trecho do texto</div>
                  <div class="detailed-grid-value bg-highlight">"${escapeHtml(iss.offending_text || iss.trecho)}"</div>
                ` : ''}
                <div class="detailed-grid-label">Diagnóstico</div>
                <div class="detailed-grid-value">${escapeHtml(iss.teacher_feedback || iss.comentario || 'Observação pedagógica')}</div>
                ${iss.rewrite_suggestion || iss.sugestao ? `
                  <div class="detailed-grid-label">Sugestão de reescrita</div>
                  <div class="detailed-grid-value bg-light-green">${escapeHtml(iss.rewrite_suggestion || iss.sugestao)}</div>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  ` : '';

  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;
  if (!doc || !win) {
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(`
    <!doctype html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8" />
      <title>RedaLine - Correção de Redação (${escapeHtml(studentName)})</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @page { size: A4 portrait; margin: 10mm; margin-bottom: 15mm; }
        html, body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; color: #1e293b; }
        body { margin: 0; font-family: 'Inter', Arial, sans-serif; font-size: 11px; }
        * { box-sizing: border-box; }
        .print-root { width: 100%; padding: 0; }
        .page-break { page-break-before: always; break-before: page; height: 10px; }

        .text-blue { color: #1d4ed8; }
        .text-green { color: #15803d; }
        .text-yellow { color: #b45309; }
        .text-purple { color: #6d28d9; }

        .bg-light-green { background-color: #ecfdf5; }
        .bg-light-yellow { background-color: #fefce8; }
        .bg-light-blue { background-color: #eff6ff; }
        .bg-highlight { background-color: #fff7ed; }

        .text-c1 { color: #6d28d9; } .bg-c1 { background-color: #6d28d9; color: #fff; } .bg-light-c1 { background-color: #f5f3ff; } .text-dark-c1 { color: #5b21b6; } .border-c1 { border-color: #c4b5fd; } .bg-subtle-c1 { background-color: #faf5ff; }
        .text-c2 { color: #2563eb; } .bg-c2 { background-color: #2563eb; color: #fff; } .bg-light-c2 { background-color: #eff6ff; } .text-dark-c2 { color: #1d4ed8; } .border-c2 { border-color: #bfdbfe; } .bg-subtle-c2 { background-color: #f0f9ff; }
        .text-c3 { color: #ea580c; } .bg-c3 { background-color: #ea580c; color: #fff; } .bg-light-c3 { background-color: #fff7ed; } .text-dark-c3 { color: #c2410c; } .border-c3 { border-color: #fed7aa; } .bg-subtle-c3 { background-color: #fffbeb; }
        .text-c4 { color: #16a34a; } .bg-c4 { background-color: #16a34a; color: #fff; } .bg-light-c4 { background-color: #f0fdf4; } .text-dark-c4 { color: #15803d; } .border-c4 { border-color: #bbf7d0; } .bg-subtle-c4 { background-color: #f0fdf4; }
        .text-c5 { color: #db2777; } .bg-c5 { background-color: #db2777; color: #fff; } .bg-light-c5 { background-color: #fdf2f8; } .text-dark-c5 { color: #be185d; } .border-c5 { border-color: #fbcfe8; } .bg-subtle-c5 { background-color: #fdf2f8; }

        .header-container { display: flex; justify-content: space-between; align-items: stretch; border-bottom: 2px solid #001B3D; padding-bottom: 12px; margin-bottom: 18px; }
        .header-brand { display: flex; flex-direction: column; justify-content: center; }
        .brand-logo-text { font-size: 24px; font-weight: 900; color: #001B3D; letter-spacing: -0.5px; }
        .brand-logo-text span { color: #457A00; }
        .brand-sub { font-size: 8px; text-transform: uppercase; letter-spacing: 2px; color: #64748b; font-weight: 700; }
        
        .header-info { display: flex; flex-direction: column; gap: 6px; flex: 1; margin-left: 25px; border-left: 1px solid #e2e8f0; padding-left: 15px; font-size: 10px; }
        .header-info-row { display: grid; grid-template-columns: 16px 1fr; gap: 6px; align-items: start; }
        .header-info-label { font-weight: 700; color: #64748b; font-size: 8px; text-transform: uppercase; }
        .header-info-value { color: #0f172a; font-weight: 600; font-size: 11px; }

        .header-score-box { border-left: 1px solid #e2e8f0; padding-left: 20px; width: 170px; text-align: left; }
        .header-score-title { font-size: 9px; font-weight: 800; color: #001B3D; text-transform: uppercase; }
        .header-score-val { font-size: 38px; font-weight: 900; color: #001B3D; line-height: 1; }
        .header-score-max { font-size: 14px; font-weight: 500; color: #64748b; }
        .header-badge { display: inline-block; background-color: #457A00; color: white; padding: 3px 8px; border-radius: 4px; font-size: 9px; font-weight: 800; margin-top: 4px; }

        .essay-box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px; margin-bottom: 20px; }
        .essay-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .essay-icon { background: #001B3D; color: white; width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; }
        .essay-title { font-size: 12px; font-weight: 800; color: #001B3D; margin: 0; }
        .essay-content { font-size: 11px; line-height: 1.8; color: #334155; text-align: justify; white-space: pre-wrap; font-family: 'Inter', Georgia, serif; }

        .comp-card { 
          display: grid; 
          grid-template-columns: 85px 1fr 130px; 
          gap: 15px; 
          border: 1px solid #cbd5e1; 
          border-radius: 10px; 
          padding: 12px 16px; 
          margin-bottom: 14px; 
          page-break-inside: avoid; 
        }
        .comp-card-col1 { border-right: 1px solid #e2e8f0; padding-right: 8px; display: flex; flex-direction: column; align-items: flex-start; }
        .comp-header-label { font-size: 8px; font-weight: 800; text-transform: uppercase; margin-bottom: 0px; }
        .comp-number { font-size: 38px; font-weight: 900; line-height: 1; margin-bottom: 6px; }
        .comp-name { font-size: 9px; font-weight: 800; color: #0f172a; margin-bottom: 8px; line-height: 1.2; text-transform: uppercase; }
        .comp-score { display: inline-block; padding: 4px 0; border-radius: 6px; font-size: 11px; font-weight: 800; text-align: center; width: 100%; }

        .comp-card-col2 { padding-right: 12px; border-right: 1px solid #e2e8f0; }
        .comp-title { font-size: 9px; font-weight: 800; text-transform: uppercase; margin-bottom: 8px; }
        .comp-issues-list { list-style: none; padding: 0; margin: 0; }
        .comp-issues-list li { display: flex; gap: 8px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #e2e8f0; font-size: 9px; }
        .comp-issues-list li:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .issue-idx { display: flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; color: white; font-size: 9px; font-weight: bold; flex-shrink: 0; }
        .issue-content { font-size: 9px; color: #334155; line-height: 1.4; }

        .comp-card-col3 { display: flex; flex-direction: column; }
        .comp-improve-text { font-size: 9px; color: #334155; line-height: 1.4; margin-bottom: 10px; }
        .comp-improve-btn { padding: 6px; border-radius: 6px; font-size: 8px; font-weight: 700; text-align: center; }

        .detailed-issue-card { border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 12px; overflow: hidden; page-break-inside: avoid; }
        .detailed-header { display: flex; gap: 6px; padding: 8px 12px; border-bottom: 1px solid #e2e8f0; align-items: center; flex-wrap: wrap; background: #f8fafc; }
        .detailed-num { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; }
        .detailed-chip { background: #e2e8f0; color: #334155; padding: 2px 8px; border-radius: 10px; font-size: 8px; font-weight: 700; }
        .detailed-body { padding: 10px 12px; }
        .detailed-grid { display: grid; grid-template-columns: 120px 1fr; gap: 8px; align-items: start; }
        .detailed-grid-label { font-size: 8px; font-weight: 800; color: #64748b; margin-top: 3px; }
        .detailed-grid-value { font-size: 10px; color: #1e293b; line-height: 1.4; padding: 6px 8px; border-radius: 4px; }

        .print-shell { width: 100%; border-collapse: collapse; }
        .print-shell > tbody > tr > td,
        .print-shell > tfoot > tr > td { padding: 0; border: 0; vertical-align: top; }
        .print-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 8px;
          padding-bottom: 4px;
          border-top: 1px solid #e2e8f0;
          background: #fff;
          font-size: 9px;
        }
        .footer-brand { font-weight: 800; color: #001B3D; }
        .footer-brand span { color: #457A00; }
      </style>
    </head>
    <body>
      <table class="print-shell">
        <tfoot>
          <tr>
            <td>
              <div class="print-footer">
                <div class="footer-brand">Reda<span>Line</span> • Tecnologia que Ensina</div>
                <div style="color: #64748b;">Correção Gratuita • redaline.com.br</div>
              </div>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>
              <div class="print-root">
                <!-- CABEÇALHO DA PÁGINA 1 -->
                <div class="header-container">
                  <div class="header-brand">
                    <div class="brand-logo-text">Reda<span>Line</span></div>
                    <div class="brand-sub">Tecnologia que Ensina</div>
                  </div>
                  <div class="header-info">
                    <div class="header-info-row">
                      <span>👤</span>
                      <div>
                        <div class="header-info-label">Estudante</div>
                        <div class="header-info-value">${escapeHtml(studentName)}</div>
                      </div>
                    </div>
                    <div class="header-info-row">
                      <span>📅</span>
                      <div>
                        <div class="header-info-label">Data</div>
                        <div class="header-info-value">${escapeHtml(formattedDate)}</div>
                      </div>
                    </div>
                    <div class="header-info-row">
                      <span>📄</span>
                      <div>
                        <div class="header-info-label">Tema</div>
                        <div class="header-info-value">${escapeHtml(theme)}</div>
                      </div>
                    </div>
                  </div>
                  <div class="header-score-box">
                    <div class="header-score-title">NOTA ESTIMADA (ENEM)</div>
                    <div><span class="header-score-val">${totalScore}</span><span class="header-score-max"> /1000</span></div>
                    <div class="header-badge">${totalScore >= 900 ? 'EXCELENTE' : totalScore >= 800 ? 'MUITO BOM' : totalScore >= 600 ? 'BOM' : 'EM EVOLUÇÃO'}</div>
                  </div>
                </div>

                <!-- TEXTO DA REDAÇÃO -->
                <div class="essay-box">
                  <div class="essay-header">
                    <div class="essay-icon">📄</div>
                    <h3 class="essay-title">TEXTO DA SUA REDAÇÃO</h3>
                  </div>
                  <div class="essay-content">${escapeHtml(essayText)}</div>
                </div>

                <!-- PARECER DA PROFESSORA ALINEE -->
                <div style="margin: 15px 0; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 14px; page-break-inside: avoid;">
                  <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #1e3a8a; margin-bottom: 6px;">
                    Diagnóstico Geral Pedagógico
                  </div>
                  <p style="font-size: 10px; color: #1e40af; line-height: 1.5; margin: 0;">
                    ${escapeHtml(alineeQualitativa)}
                  </p>
                </div>

                <div class="page-break"></div>

                <!-- PÁGINA 2: AVALIAÇÃO DAS 5 COMPETÊNCIAS -->
                <div style="border-bottom: 2px solid #001B3D; padding-bottom: 8px; margin-bottom: 14px;">
                  <h2 style="font-size: 16px; font-weight: 900; color: #001B3D; margin: 0 0 2px 0; text-transform: uppercase;">
                    ANÁLISE POR COMPETÊNCIAS (ENEM)
                  </h2>
                  <p style="font-size: 10px; color: #64748b; margin: 0;">
                    Critérios oficiais avaliados pela inteligência pedagógica da RedaLine.
                  </p>
                </div>

                ${competencyCardsHtml}

                ${sugestoes.length > 0 ? `
                  <div style="margin-top: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; page-break-inside: avoid;">
                    <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #001B3D; margin-bottom: 6px;">
                      Sugestões Pedagógicas para Evolução
                    </div>
                    <ul style="margin: 0; padding-left: 16px; font-size: 9px; color: #334155; line-height: 1.5;">
                      ${sugestoes.map((sug) => `<li>${escapeHtml(sug)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <!-- PÁGINA 3: APONTAMENTOS DETALHADOS -->
                ${detailedIssuesHtml}

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `);
  doc.close();

  await new Promise((resolve) => setTimeout(resolve, 300));
  win.focus();
  win.print();
  setTimeout(() => {
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
  }, 2000);
}

/**
 * Gera um card resumo de alta resolução em imagem (JPG/PNG) para compartilhamento no WhatsApp/Redes
 */
export async function exportToImage(leadData, targetElementId = 'redaline-shareable-card') {
  if (!leadData) return;

  const html2canvas = (await import('html2canvas')).default;
  const element = document.getElementById(targetElementId);
  if (!element) {
    throw new Error('Elemento de visualização não encontrado.');
  }

  // Gera canvas em alta resolução (scale: 2)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#001B3D',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const normalizedName = (leadData.name || 'estudante')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-');

  const link = document.createElement('a');
  link.download = `redaline-correcao-${normalizedName}.jpg`;
  link.href = imgData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
