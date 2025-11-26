export const exportToPDF = async (metrics, result) => {
    try {
        // Validate inputs
        if (!metrics || !result) {
            throw new Error('Missing required data for PDF export');
        }

        // Dynamic import to avoid build issues
        const { default: jsPDF } = await import('jspdf');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Header with orange background
        pdf.setFillColor(230, 81, 0);
        pdf.rect(0, 0, pageWidth, 40, 'F');

        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(28);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Valuation.AI', 20, 25);

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Startup Valuation Report', 20, 33);

        // Date
        pdf.setFontSize(10);
        const dateStr = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        pdf.text(dateStr, pageWidth - 60, 25);

        // Reset to black
        pdf.setTextColor(0, 0, 0);

        let y = 55;

        // Main Valuation
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('ESTIMATED VALUATION', 20, y);

        y += 12;
        pdf.setFontSize(36);
        pdf.setTextColor(230, 81, 0);
        const valuation = result.valuation || 0;
        const valuationText = `$${(valuation / 1000000).toFixed(2)}M`;
        pdf.text(valuationText, 20, y);

        y += 15;
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        pdf.text('Enterprise Value Estimate', 20, y);

        y += 15;

        // Divider line
        pdf.setDrawColor(230, 81, 0);
        pdf.setLineWidth(0.5);
        pdf.line(20, y, pageWidth - 20, y);

        y += 10;

        // Key Metrics Section
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text('KEY METRICS', 20, y);

        y += 8;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');

        const metrics1 = [
            ['Annual Recurring Revenue', `$${((metrics.arr || 0) / 1000000).toFixed(2)}M`],
            ['Year-over-Year Growth', `${(metrics.growthRate || 0)}%`],
            ['Gross Margin', `${(metrics.grossMargin || 0)}%`],
            ['Net Revenue Retention', `${(metrics.netRevenueRetention || 0)}%`],
            ['Monthly Churn Rate', `${(metrics.churnRate || 0)}%`],
            ['Monthly Burn Rate', `$${((metrics.burnRate || 0) / 1000).toFixed(0)}K`],
        ];

        metrics1.forEach(([label, value]) => {
            pdf.setFont('helvetica', 'normal');
            pdf.text(label, 25, y);
            pdf.setFont('helvetica', 'bold');
            pdf.text(value, 130, y);
            y += 6;
        });

        y += 5;

        // Unit Economics
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.text('UNIT ECONOMICS', 20, y);

        y += 8;
        pdf.setFontSize(10);

        const cac = metrics.cac || 0;
        const ltv = metrics.ltv || 0;
        const ltvCacRatio = cac > 0 ? (ltv / cac).toFixed(1) : 'N/A';

        const metrics2 = [
            ['Customer Acquisition Cost', `$${cac.toLocaleString()}`],
            ['Lifetime Value', `$${ltv.toLocaleString()}`],
            ['LTV:CAC Ratio', `${ltvCacRatio}:1`],
        ];

        metrics2.forEach(([label, value]) => {
            pdf.setFont('helvetica', 'normal');
            pdf.text(label, 25, y);
            pdf.setFont('helvetica', 'bold');
            pdf.text(value, 130, y);
            y += 6;
        });

        y += 5;

        // Company Info
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.text('COMPANY INFORMATION', 20, y);

        y += 8;
        pdf.setFontSize(10);

        const companyInfo = [
            ['Industry', metrics.industry || 'N/A'],
            ['Funding Stage', metrics.fundingStage || 'N/A'],
            ['Team Size', `${metrics.teamSize || 0} people`],
        ];

        companyInfo.forEach(([label, value]) => {
            pdf.setFont('helvetica', 'normal');
            pdf.text(label, 25, y);
            pdf.setFont('helvetica', 'bold');
            pdf.text(value, 130, y);
            y += 6;
        });

        y += 10;

        // Divider
        pdf.setDrawColor(230, 81, 0);
        pdf.line(20, y, pageWidth - 20, y);

        y += 10;

        // Valuation Details
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text('VALUATION BREAKDOWN', 20, y);

        y += 8;
        pdf.setFontSize(10);

        const details = result.details || {};
        const detailsData = [
            ['Base Revenue Multiple', `${(details.baseMultiple || 0).toFixed(1)}x`],
            ['Final Revenue Multiple', `${(details.finalMultiple || 0).toFixed(1)}x`],
            ['Growth Adjustment Factor', `${(details.growthFactor || 0).toFixed(2)}x`],
            ['Rule of 40 Score', `${(details.ruleOf40Score || 0).toFixed(0)}`],
        ];

        detailsData.forEach(([label, value]) => {
            pdf.setFont('helvetica', 'normal');
            pdf.text(label, 25, y);
            pdf.setFont('helvetica', 'bold');
            pdf.text(value, 130, y);
            y += 6;
        });

        // Footer
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.setFont('helvetica', 'italic');
        pdf.text('Generated by Valuation.AI - Premium Startup Valuation Calculator', 20, pageHeight - 15);
        pdf.text('This valuation is an estimate and should not be considered financial advice.', 20, pageHeight - 10);
        pdf.text('For investment decisions, please consult with qualified financial advisors.', 20, pageHeight - 5);

        // Save
        const filename = `valuation-${Date.now()}.pdf`;
        pdf.save(filename);

        return true;
    } catch (error) {
        console.error('PDF Error:', error);
        throw new Error(`PDF generation failed: ${error.message}`);
    }
};
