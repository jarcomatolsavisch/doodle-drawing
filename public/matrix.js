function Matrix(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    for(let i=0; i<this.rows; i++){
        this.matrix[i] = [];
        for(let j=0; j<this.cols; j++){
            this.matrix[i][j] = 0;
        }
    }
}

Matrix.fromArray = function(arr){
    let result = new Matrix(arr.length, 1);
    for(let i=0;i<arr.length;i++){
        result.matrix[i][0] = arr[i];
    }
    //result.print();
    return result;
}

Matrix.prototype.scale = function(n){
    for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
            this.matrix[i][j] *= n;
        }
    }
}
Matrix.prototype.add = function(n){
    for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
            this.matrix[i][j] += n;
        }
    }
}
// 矩陣元素值介於-1到1
Matrix.prototype.randomize = function(){
    for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
            //this.matrix[i][j] = Math.floor(Math.random() * 10);
            this.matrix[i][j] = Math.random() * 2 - 1;
        }
    }
}
Matrix.prototype.add_eltwise = function(mat){
    if(mat instanceof Matrix){
        if(mat.rows != this.rows || mat.cols != this.cols){
            throw new Error("[ERROR]Dimension confliction.");
        }
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                this.matrix[i][j] += mat.matrix[i][j];
            }
        }
    }else{
        throw new Error("[ERROR]The input should be a matrix.");
    }
}
Matrix.substract_eltwise = function(mat1, mat2){
    if(mat1 instanceof Matrix && mat2 instanceof Matrix){
        if(mat1.rows != mat2.rows || mat1.cols != mat2.cols){
            throw new Error("[ERROR]Dimension confliction.");
        }
        let result = new Matrix(mat1.rows, mat1.cols);
        for(let i=0; i<result.rows; i++){
            for(let j=0; j<result.cols; j++){
                result.matrix[i][j] = mat1.matrix[i][j] - mat2.matrix[i][j];
            }
        }
        return result;
    }else{
        throw new Error("[ERROR]The input should be a matrix.");
    }
}
Matrix.mul_eltwise = function(mat1, mat2){
    if(mat1 instanceof Matrix && mat2 instanceof Matrix){
        if(mat1.rows != mat2.rows || mat1.cols != mat2.cols){
            throw new Error("[ERROR]Dimension confliction.");
        }
        let result = new Matrix(mat1.rows, mat1.cols);
        for(let i=0; i<result.rows; i++){
            for(let j=0; j<result.cols; j++){
                result.matrix[i][j] = mat1.matrix[i][j] * mat2.matrix[i][j];
            }
        }
        return result;
    }else{
        throw new Error("[ERROR]The input should be a matrix.");
    }
}
//A static method
Matrix.mul = function(mat1, mat2){
    if(mat1 instanceof Matrix && mat2 instanceof Matrix){
        if(mat1.cols != mat2.rows){
            throw new Error("[ERROR]Dimension confliction.");
        }
        result = new Matrix(mat1.rows, mat2.cols);
        for(let i=0; i<result.rows; i++){
            for(let j=0; j<result.cols; j++){
                let sum = 0;
                for(let k=0; k<mat1.cols; k++){
                    sum += mat1.matrix[i][k] * mat2.matrix[k][j];
                }
                result.matrix[i][j] = sum;
            }
        }
        return result;
    }else{
        throw new Error("[ERROR]The input should be a matrix.");
    }
}
Matrix.transpose = function(mat){
    let result = new Matrix(mat.cols, mat.rows);
    for(let i=0; i<mat.rows; i++){
        for(let j=0; j<mat.cols; j++){
            result.matrix[j][i] = mat.matrix[i][j];
        }
    }
    return result;
}

Matrix.prototype.map = function(fun){
    for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
            this.matrix[i][j] = fun(this.matrix[i][j]);
        }
    }
}

Matrix.prototype.print = function(){
    console.table(this.matrix);
}

Matrix.createNewMat = function(matArray){
    let result = new Matrix(matArray.length, matArray[0].length);
    result.matrix = matArray;
    return result;
}

Matrix.prototype.copy = function(){
    let result = new Matrix(this.rows, this.cols);
    for(let i=0; i<result.rows; i++){
        for(let j=0; j<result.cols; j++){
            result.matrix[i][j] = this.matrix[i][j];
        }
    }
    return result;
}
