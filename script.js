const net = new brain.NeuralNetwork({
    //hiddenLayers: [3, 3, 3]
});

const data = [
    {
        input: { r: 0, g: 0, b: 0 },
        output: [1]
    },
    {
        input: { r: 1, g: 1, b: 1 },
        output: [0]
    }
];

net.train(data);

const colorEl = document.getElementById('color');
const guessEl = document.getElementById('guess');
const whiteButton = document.getElementById('white-button');
const blackButton = document.getElementById('black-button');

let color;
setRandomColor();

whiteButton.addEventListener('click', () => {
    chooseColor(1);
})

blackButton.addEventListener('click', () => {
    chooseColor(0);
})

function chooseColor(value) {
    data.push({
        input: color,
        output: [value]
    });
    net.train(data);
    setRandomColor();
}

function setRandomColor() {
    color = {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    };
    const guessColor = net.run(color)[0];
    guessEl.style.color = guessColor > 0.5 ? '#FFF' : '#000';
    colorEl.style.backgroundColor =
        `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`;
}