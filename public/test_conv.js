let mat = Matrix.createNewMat([[1,0,2,3,0],
                               [0,1,2,1,1],
                               [3,0,0,1,1],
                               [2,1,0,0,1],
                               [0,1,0,0,1]]);
let filter = Matrix.createNewMat([[-1,1,1],
                                  [-1,1,1], 
                                  [-1,1,1]]);
                         
//mat.print();
//filter.print();
/*
mat.subMatrix(0,1,3,3).print();
//filter.print();
let mat1 = Matrix.mul_eltwise(mat.subMatrix(0,1,3,3),filter);
mat1.print();
let val = Matrix.mul_eltwise(mat.subMatrix(0,1,3,3),filter).summation();
console.log(val);
*/
//convolution(mat,filter).print();
