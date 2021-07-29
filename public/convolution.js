function convolution(mat, filter){
    if(mat instanceof Matrix && filter instanceof Matrix){
        if(mat.rows>=filter.rows && mat.cols>=filter.cols){
            let result = new Matrix(mat.rows-filter.rows+1,
                                    mat.cols-filter.cols+1);
            for(let i=0;i<result.rows;i++){
                for(let j=0;j<result.cols;j++){
                    let product = Matrix.mul_eltwise(
                                            mat.subMatrix(i,j,filter.rows,filter.cols)
                                            ,filter);
                    result.matrix[i][j] = product.summation();
                }
            }
            return result;
        }else{
            throw new Error("[ERROR]The size of the matrix is smaller than the filter.");
        }
    }else{
        throw new Error("[ERROR]The input should be a matrix.");
    }
}

