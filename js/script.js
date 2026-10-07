// =====================================================
// TIC TAC TOE - UNBEATABLE BOT
// =====================================================


// =====================================================
// ELEMENT HTML
// =====================================================

const menu = document.getElementById("menu");
const game = document.getElementById("game");

const playerFirstBtn =
    document.getElementById("playerFirstBtn");

const botFirstBtn =
    document.getElementById("botFirstBtn");

const backButton =
    document.getElementById("backButton");

const restartButton =
    document.getElementById("restartButton");

const statusText =
    document.getElementById("status");

const resultText =
    document.getElementById("result");

const cells =
    document.querySelectorAll(".cell");


// =====================================================
// VARIABEL GAME
// =====================================================

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let playerSymbol = "X";
let botSymbol = "O";

let currentPlayer = "X";

let gameOver = false;

let botThinking = false;


// =====================================================
// KOMBINASI PEMENANG
// =====================================================

const winningCombinations = [

    // Baris
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Kolom
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6]
];


// =====================================================
// MULAI GAME
// =====================================================

function startGame(botStarts) {

    // Reset board
    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    gameOver = false;
    botThinking = false;

    resultText.textContent = "";


    // =============================================
    // BOT JALAN DULUAN
    // =============================================

    if (botStarts) {

        botSymbol = "X";

        playerSymbol = "O";

        currentPlayer = "X";

    }


    // =============================================
    // PLAYER JALAN DULUAN
    // =============================================

    else {

        playerSymbol = "X";

        botSymbol = "O";

        currentPlayer = "X";

    }


    // Pindah dari menu ke game

    menu.classList.add("hidden");

    game.classList.remove("hidden");


    // Reset tampilan

    resetBoardUI();


    // Update status

    updateStatus();


    // Jika Bot jalan duluan

    if (currentPlayer === botSymbol) {

        botMove();

    }
}


// =====================================================
// RESET TAMPILAN BOARD
// =====================================================

function resetBoardUI() {

    cells.forEach((cell) => {

        cell.textContent = "";

        cell.classList.remove("x");

        cell.classList.remove("o");

        cell.classList.remove("winner");

        cell.disabled = false;

    });
}


// =====================================================
// UPDATE STATUS
// =====================================================

function updateStatus() {

    if (gameOver) {
        return;
    }


    if (currentPlayer === playerSymbol) {

        statusText.textContent =
            `Your Turn (${playerSymbol})`;

    }

    else {

        statusText.textContent =
            `Bot Turn (${botSymbol})`;

    }
}


// =====================================================
// PLAYER CLICK CELL
// =====================================================

cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        const index =
            Number(cell.dataset.index);

        playerMove(index);

    });

});


// =====================================================
// PLAYER MOVE
// =====================================================

function playerMove(index) {

    // Game sudah selesai
    if (gameOver) {
        return;
    }


    // Bot sedang berpikir
    if (botThinking) {
        return;
    }


    // Bukan giliran player
    if (currentPlayer !== playerSymbol) {
        return;
    }


    // Kotak sudah terisi
    if (board[index] !== "") {
        return;
    }


    // Masukkan simbol Player

    board[index] = playerSymbol;


    // Update tampilan

    updateCell(index);


    // Cek apakah game selesai

    const result =
        checkGameResult(board);


    if (result !== null) {

        finishGame(result);

        return;
    }


    // Ganti giliran ke Bot

    currentPlayer = botSymbol;

    updateStatus();


    // Jalankan Bot

    botMove();
}


// =====================================================
// UPDATE CELL
// =====================================================

function updateCell(index) {

    const cell = cells[index];

    cell.textContent = board[index];


    if (board[index] === "X") {

        cell.classList.add("x");

    }

    else if (board[index] === "O") {

        cell.classList.add("o");

    }


    cell.disabled = true;
}


// =====================================================
// BOT MOVE
// =====================================================

function botMove() {

    botThinking = true;

    updateStatus();


    // Delay agar terlihat Bot sedang berpikir

    setTimeout(() => {

        if (gameOver) {
            return;
        }


        // Cari langkah terbaik

        const bestMove =
            getBestMove();


        // Pastikan ada langkah

        if (bestMove === null) {

            botThinking = false;

            return;

        }


        // Masukkan simbol Bot

        board[bestMove] = botSymbol;


        // Update tampilan

        updateCell(bestMove);


        // Cek hasil permainan

        const result =
            checkGameResult(board);


        if (result !== null) {

            finishGame(result);

            return;
        }


        // Kembali ke Player

        currentPlayer = playerSymbol;

        botThinking = false;

        updateStatus();

    }, 500);
}


// =====================================================
// MINIMAX
// =====================================================
//
// BOT MENGGUNAKAN ALGORITMA MINIMAX.
//
// Nilai:
//
// Bot menang  = +10
// Seri        = 0
// Player menang = -10
//
// Bot selalu memilih nilai terbesar.
// Player dianggap memilih nilai terkecil.
//
// Karena semua kemungkinan langkah dihitung,
// Bot tidak mungkin kalah.
// =====================================================

function minimax(newBoard, depth, isMaximizing) {

    const result =
        checkGameResult(newBoard);


    // =============================================
    // BOT MENANG
    // =============================================

    if (
        result !== null &&
        result.winner === botSymbol
    ) {

        return 10 - depth;

    }


    // =============================================
    // PLAYER MENANG
    // =============================================

    if (
        result !== null &&
        result.winner === playerSymbol
    ) {

        return depth - 10;

    }


    // =============================================
    // SERI
    // =============================================

    if (
        result !== null &&
        result.winner === "draw"
    ) {

        return 0;

    }


    // =============================================
    // GILIRAN BOT
    // =============================================

    if (isMaximizing) {

        let bestScore = -Infinity;


        for (let i = 0; i < newBoard.length; i++) {

            if (newBoard[i] === "") {

                // Coba Bot di posisi ini

                newBoard[i] = botSymbol;


                const score =
                    minimax(
                        newBoard,
                        depth + 1,
                        false
                    );


                // Kembalikan

                newBoard[i] = "";


                // Ambil nilai terbesar

                bestScore =
                    Math.max(
                        bestScore,
                        score
                    );
            }
        }


        return bestScore;

    }


    // =============================================
    // GILIRAN PLAYER
    // =============================================

    else {

        let bestScore = Infinity;


        for (let i = 0; i < newBoard.length; i++) {

            if (newBoard[i] === "") {

                // Coba Player di posisi ini

                newBoard[i] = playerSymbol;


                const score =
                    minimax(
                        newBoard,
                        depth + 1,
                        true
                    );


                // Kembalikan

                newBoard[i] = "";


                // Ambil nilai terkecil

                bestScore =
                    Math.min(
                        bestScore,
                        score
                    );
            }
        }


        return bestScore;
    }
}


// =====================================================
// MENCARI LANGKAH TERBAIK BOT
// =====================================================

function getBestMove() {

    let bestScore = -Infinity;

    let bestMove = null;


    // Coba semua kotak

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            // Simulasikan Bot

            board[i] = botSymbol;


            // Hitung skor

            const score =
                minimax(
                    board,
                    0,
                    false
                );


            // Kembalikan board

            board[i] = "";


            // Jika skor lebih baik

            if (score > bestScore) {

                bestScore = score;

                bestMove = i;

            }
        }
    }


    return bestMove;
}


// =====================================================
// CEK HASIL GAME
// =====================================================

function checkGameResult(currentBoard) {

    // Cek semua kombinasi

    for (
        const combination
        of winningCombinations
    ) {

        const [a, b, c] =
            combination;


        // Jika ada tiga simbol sama

        if (
            currentBoard[a] !== "" &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[a] === currentBoard[c]
        ) {

            return {

                winner: currentBoard[a],

                combination: combination

            };
        }
    }


    // Cek seri

    if (
        currentBoard.every(
            cell => cell !== ""
        )
    ) {

        return {

            winner: "draw",

            combination: []

        };
    }


    // Belum selesai

    return null;
}


// =====================================================
// FINISH GAME
// =====================================================

function finishGame(result) {

    gameOver = true;

    botThinking = false;


    // =============================================
    // PLAYER MENANG
    // =============================================

    if (result.winner === playerSymbol) {

        statusText.textContent =
            "Player Win!";

        resultText.textContent =
            "Kamu berhasil mengalahkan Bot!";

    }


    // =============================================
    // BOT MENANG
    // =============================================

    else if (result.winner === botSymbol) {

        statusText.textContent =
            "Bot Win!";

        resultText.textContent =
            "Bot Wins The Game!.";

    }


    // =============================================
    // SERI
    // =============================================

    else {

        statusText.textContent =
            "Game Draw!";

        resultText.textContent =
            "No One Won!.";

    }


    // Warnai garis pemenang

    result.combination.forEach(index => {

        cells[index]
            .classList.add("winner");

    });


    // Nonaktifkan semua cell

    cells.forEach(cell => {

        cell.disabled = true;

    });
}


// =====================================================
// RESTART
// =====================================================

restartButton.addEventListener(
    "click",
    () => {

        // Tentukan siapa yang jalan duluan
        // berdasarkan game sebelumnya

        const botStarts =
            playerSymbol !== currentPlayer;

        startGame(botStarts);

    }
);


// =====================================================
// KEMBALI KE MENU
// =====================================================

backButton.addEventListener(
    "click",
    () => {

        game.classList.add("hidden");

        menu.classList.remove("hidden");

        gameOver = false;

        botThinking = false;

    }
);


// =====================================================
// PLAYER JALAN DULUAN
// =====================================================

playerFirstBtn.addEventListener(
    "click",
    () => {

        startGame(false);

    }
);


// =====================================================
// BOT JALAN DULUAN
// =====================================================

botFirstBtn.addEventListener(
    "click",
    () => {

        startGame(true);

    }
);