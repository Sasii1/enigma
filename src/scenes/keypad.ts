export default class Keypad extends Phaser.Scene {
    static inputTesto: string = '';
    private Text: Phaser.GameObjects.Text;
    static isEnter:boolean;
    static success: boolean;
    constructor() {
        super({ key: "Keypad" });
    }

    create() {
        const buttons = ['A', 'N', 'C', 'D', 'E', 'F', 'G', 'T', 'I', 'R', 'C', 'Enter'];
        const buttonWidth = 80;
        const buttonHeight = 80;
        const startX = 430;
        const startY = 200;
        const padding = 10;
        let x = startX;
        let y = startY;

        const currentNumberRectangle = this.add.rectangle(startX + 90, startY - 90, (buttonWidth + padding) * 3 - 10, buttonHeight, 0x666666)
            .setOrigin(0.5);

        this.Text = this.add.text(currentNumberRectangle.x, currentNumberRectangle.y, Keypad.inputTesto, { fontSize: '44px', color: '#cccc98' })
            .setOrigin(0.5);

        buttons.forEach((label, index) => {
            const button = this.add.rectangle(x, y, buttonWidth, buttonHeight, 0x666666)
                .setInteractive()
                .on('pointerdown', () => this.onButtonClick(label));
            const buttonText = this.add.text(x, y, label, { fontSize: '24px', color: '#cccc98' })
                .setOrigin(0.5);

            x += buttonWidth + padding;

            if ((index + 1) % 3 === 0) {
                x = startX;
                y += buttonHeight + padding;
            }
        });
    }

    private onButtonClick(label: string) {

        if (label === 'C') {
            Keypad.inputTesto = '';
        } else if (label === 'Enter') {
            Keypad.isEnter = true;
            console.log(Keypad.inputTesto);
            if(Keypad.inputTesto == "NEFERTITI"){
                console.log("vai");
                this.scene.remove("Keypad");
                Keypad.success = true;
            }
        } else {
            Keypad.inputTesto += label;
        }

        this.Text.setText(Keypad.inputTesto);

    }
}