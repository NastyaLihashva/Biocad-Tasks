let matrixExample = [

    [ 1, 2, 3, 4 ],

    [ 4, 5, 6, 5 ],

    [ 7, 8, 9, 7 ],

    [ 7, 8, 9, 7 ]

];

function sumUpDiagonals(matrix) {
    const n = matrix.length;
    let basicSum = 0;
    let secondSum = 0;
    for(let i = 0; i < n; i++){
        basicSum += matrix[i][i];
    }
    for(let i = 0; i < n; i++){
        secondSum += matrix[i][n-i-1];
    }
    return ('Сумма основной диагонали: ' + basicSum + '\nСумма вторичной диагонали: ' + secondSum);

}


console.log(sumUpDiagonals(matrixExample))

