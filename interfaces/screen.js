const Screen = {

    cleanScreen: () => {
        console.clear();
        process.stdout.write('\x1B[2J\x1B[0f'); // Move o cursor para o topo e limpa a tela
    },

    waitFor: (seconds) => {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    },

    statusMessage: async (message, seconds) => {
        Screen.cleanScreen()
        console.log(message);
        await Screen.waitFor(seconds);
        Screen.cleanScreen()
    }

}

module.exports = Screen;