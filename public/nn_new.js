//the activation function
function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}
//to compute the square 2-norm of the error * 1/2
function distance(vector){
    let sum = 0;
    for(i=0;i<vector.rows;i++){
        sum += vector.matrix[i][0]*vector.matrix[i][0];
    }
    return sum/2;
}
//Initiallizing the NN
/* NeuralNetwork([2,3,3,2]) produces a neural network with
   # input nodes = 2
   # first hidden layer nodes = 3
   # second hidden layer nodes = 3
   # output nodes = 2
*/
function NeuralNetwork(num){
    this.num = num;
    
    this.layer = [];
    this.weight = [];
    this.bias   = [];
    for(let l = 0;l<num.length-1;l++){
        this.weight[l] = new Matrix(num[l+1],num[l]);
        this.weight[l].randomize();
        this.bias[l] = new Matrix(num[l+1],1);
    }
    this.learning_rate = 0.5;
}

NeuralNetwork.prototype.info = function(){
    console.log("Layers:");
    console.log(this.layer);
    console.log("Weights:");
    for(let l = 0;l<this.num.length-1;l++){
        this.weight[l].print();
    }
}


NeuralNetwork.prototype.feedForward = function(inputArray){
    //Generating the hidden outputs
    this.layer[0] = Matrix.fromArray(inputArray);
    //console.log("Feedforwarding");
    //console.log(this.num.length-1);
    for(let l=0;l<this.num.length-1;l++){
        //console.log("hello");
        this.layer[l+1] = Matrix.mul(this.weight[l], this.layer[l]);
        this.layer[l+1].add_eltwise(this.bias[l]);
        this.layer[l+1].map(sigmoid);
        //this.layer[l+1].print();
    }
    //return the output layer
    return this.layer[this.num.length-1];
}

NeuralNetwork.prototype.train = function(input, target){
    let output = this.feedForward(input);
    target = Matrix.fromArray(target);
    //console.log(output);
    //target.print();
    // The difference vectors between target and output
    let D = Matrix.substract_eltwise(target, output);
    //console.log(distance(D));
    //D.print();
    
    let grad = [];
    let delta_weight = [];
    let delta_bias = [];

    let last = this.num.length-1;
    let R = new Matrix(this.layer[last].rows, this.layer[last].cols);
    R.add(1);
    R = Matrix.substract_eltwise(R, this.layer[last]);
    R = Matrix.mul_eltwise(this.layer[last], R);
    R.scale(-1);
    grad[last] = Matrix.mul_eltwise(D, R);
    //grad[3].print();
    
    let transPreviousLayer = Matrix.transpose(this.layer[last-1]);
    delta_weight[last-1] = Matrix.mul(grad[last], transPreviousLayer);
    delta_weight[last-1].scale(-1*this.learning_rate);
    //delta_weight[last-1].print();
    
    delta_bias[last-1] = grad[last].copy();
    delta_bias[last-1].scale(-1*this.learning_rate);
    //delta_bias[last-1].print();

    //OK
    for(last = last-1;last>0;last--){
        R = new Matrix(this.layer[last].rows, this.layer[last].cols);
        R.add(1);
        R = Matrix.substract_eltwise(R, this.layer[last]);
        R = Matrix.mul_eltwise(this.layer[last], R);

        let transW = Matrix.transpose(this.weight[last]);
        grad[last] = Matrix.mul(transW, grad[last+1]);
        grad[last] = Matrix.mul_eltwise(grad[last],R);

        transPreviousLayer = Matrix.transpose(this.layer[last-1]);
        delta_weight[last-1] = Matrix.mul(grad[last],transPreviousLayer);
        delta_weight[last-1].scale(-1*this.learning_rate);
        //delta_weight[last-1].print();

        delta_bias[last-1] = grad[last].copy();
        delta_bias[last-1].scale(-1*this.learning_rate);
        //delta_bias[last-1].print();
    }
    
    //Update the weights and biases
    for(let i=0;i<this.num.length-1;i++){
        this.weight[i].add_eltwise(delta_weight[i]);
        this.bias[i].add_eltwise(delta_bias[i]);
        //this.weight[i].print();
        //this.bias[i].print();
    }
}

 //let nn = new NeuralNetwork([2,3,4,2])
 //nn.info();
 //nn.train([2,3],[1,0]);