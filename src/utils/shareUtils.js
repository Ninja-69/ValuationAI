import QRCode from 'qrcode';

export const generateShareableLink = (metrics, result) => {
    const data = {
        m: metrics,
        r: {
            v: result.valuation,
            d: result.details
        },
        t: Date.now()
    };

    const encoded = btoa(JSON.stringify(data));
    const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;

    return url;
};

export const generateQRCode = async (url) => {
    try {
        const qrDataUrl = await QRCode.toDataURL(url, {
            width: 300,
            margin: 2,
            color: {
                dark: '#E65100',
                light: '#FFFFFF'
            }
        });
        return qrDataUrl;
    } catch (err) {
        console.error('QR Code generation failed:', err);
        return null;
    }
};

export const parseSharedData = (shareParam) => {
    try {
        const decoded = atob(shareParam);
        const data = JSON.parse(decoded);
        return {
            metrics: data.m,
            result: {
                valuation: data.r.v,
                details: data.r.d
            }
        };
    } catch (err) {
        console.error('Failed to parse shared data:', err);
        return null;
    }
};

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (e) {
            document.body.removeChild(textArea);
            return false;
        }
    }
};
