export class GaugueInfo {
    gaugeType: string;
    gaugethick: number;
    gaugeValue: number;
    gaugeLabel: string;
    gaugeAppendText: string;
    gaugesize: number;
    gaugecap: 'round';
    // foregroundColor= rgba(0, 150, 136, 1);
    thresholdConfig: {
        '0': { color: 'green' },
        '25': { color: 'orange' },
        '75.5': { color: 'red' }
    };

    constructor(value: number) {
        this.gaugeValue = value;
        this.gaugeType = 'arch';
        this.gaugethick = 20;
        this.gaugeLabel = 'Consumption';
        this.gaugeAppendText = 'TND';
        this.gaugesize = 220;
        // foregroundColor= rgba(0, 150, 136, 1);
        this.thresholdConfig = {
            '0': {color: 'green'},
            '25': {color: 'orange'},
            '75.5': {color: 'red'}
        };
    }
};

