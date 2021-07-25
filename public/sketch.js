let cat_data;
let fish_data;
let strawberry_data;

let cat = {};
let fish = {};
let strawberry = {};

cat.training = [];
fish.training = [];
strawberry.training = [];

cat.testing = [];
fish.testing = [];
strawberry.testing = [];

let training = [];
let testing = [];

const len = 28*28;
const num_picture = 1000;

const CAT = 0;
const FISH = 1;
const STRAWBERRY = 2;

 //makeing the neuralnetwork
let nn = new NeuralNetwork([len,64,64,3]);;

function preload(){
    cat_data = loadBytes('Collected_data/cat1000.bin');
    fish_data = loadBytes('Collected_data/fish1000.bin');
    strawberry_data = loadBytes('Collected_data/strawberry1000.bin');
}
function setup(){
    setTrainButton();
    setTestButton();
    setSubmitButton();
    setClearButton();
    createCanvas(280, 280);
    background(255);
    prepareData(cat,cat_data,CAT);
    prepareData(fish,fish_data,FISH);
    prepareData(strawberry,strawberry_data,STRAWBERRY);
    showPictures(cat_data);
    
    training = training.concat(cat.training);
    training = training.concat(fish.training);
    training = training.concat(strawberry.training);

    testing = testing.concat(cat.testing);
    testing = testing.concat(fish.testing);
    testing = testing.concat(strawberry.testing);
    /*
    for(let i = 0; i<1;i++){
        trainEpoch(training);
        testAll(testing);
    }
    */
}

function prepareData(category, data, label){
    //to prepare the training data and testing data
    for(let i=0;i<num_picture;i++){
        let offset = i*len;
        let threshold = floor(0.8*num_picture);
        if(i<threshold){
            category.training[i] = data.bytes.subarray(offset,offset+len);
            category.training[i].label = label;
        }
        else{
            category.testing[i-threshold] = data.bytes.subarray(offset,offset+len);
            category.testing[i-threshold].label = label;
        }
    }
}
function showPictures(data){
    let total = 100;
    for(let n=0;n<total;n++){
        let img = createImage(28,28);
        img.loadPixels();
        let offset = len*n;
        for(let i=0;i<len;i++){
            let val = 255 - data.bytes[i+offset];
            img.pixels[i*4+0] = val;
            img.pixels[i*4+1] = val;
            img.pixels[i*4+2] = val;
            img.pixels[i*4+3] = 255;
        }
        img.updatePixels();
        let x = (n%10)*28;
        let y = floor(n/10)*28;
        image(img, x, y);
    }
}

function trainEpoch(training){
    //shuffle the order of training data
    shuffle(training, true);
    for(let i=0;i<training.length;i++){
        let data = training[i];
        let label = data.label;
        //transform the data into the input of the NN
        let input = [];
        for(let j=0;j<len;j++){
            input[j] = data[j]/255;
        }
        //transform the label into the target
        let target = [0,0,0];
        target[label]=1;
        nn.train(input, target);
    }
     console.log("Training for one epoch");
}
function testAll(testing){

    //shuffle the order of testing data
    shuffle(testing, true);
    //count the times of the error decision
    //and the number of data in each categories 
    let count_error = [0,0,0];
    let count_instance = [0,0,0];
    for(let i=0;i<testing.length;i++){
        let data = testing[i];
        let label = data.label;
        //transform the data into the input of the NN
        let input = [];
        for(let j=0;j<len;j++){
            input[j] = data[j]/255;
        }
        //transform the label into the target
        let target = [0,0,0];
        target[label]=1;

        let output = nn.feedForward(input);
        let decision = 0;
        for(let j = 0;j < output.rows;j++){
            if(output.matrix[j][0]>output.matrix[decision][0]){
                decision = j;
            }
        }

        target = Matrix.fromArray(target);
        let error = Matrix.substract_eltwise(output,target);
        
        //console.log('label = '+label+", decision = "+decision+" with lost = "+distance(error));
        if(label!=decision){
            count_error[label]++;
        }
        count_instance[label]++;
        //output.print();
    }
    let cat_suc = 1-count_error[0]/count_instance[0];
    let fish_suc = 1-count_error[1]/count_instance[1];
    let strawberry_suc = 1-count_error[2]/count_instance[2];
    console.log("Testing for one epoch");
    console.log("Performance:");
    console.log("Cat:"+cat_suc);
    console.log("Fish:"+fish_suc);
    console.log("Strawberry:"+strawberry_suc);
    return [cat_suc,fish_suc,strawberry_suc];
}

function setTrainButton(){
    let button = document.querySelector("#TrainBtn");
    button.onclick = function(){
        let trainMsg = document.querySelector("#trainMsg");
        trainMsg.innerHTML = "Traing....";
        for(let i = 0; i<1;i++){
            trainEpoch(training);
        }
        trainMsg = document.querySelector("#trainMsg");
        trainMsg.innerHTML = "Finish";
    };
}
function setTestButton(){
    let button = document.querySelector("#TestBtn");
    button.onclick = function(){
        let suc = testAll(testing);
        let testMsg = document.querySelector("#testMsg_cat");
        testMsg.innerHTML = "Cat: "+suc[0];
        testMsg = document.querySelector("#testMsg_fish");
        testMsg.innerHTML = "Fish: "+suc[1];
        testMsg = document.querySelector("#testMsg_strawberry");
        testMsg.innerHTML = "Strawberry: "+suc[2];
    }
}
function setSubmitButton(){
    let button = document.querySelector("#SubmitBtn");
    button.onclick = function(){
        let input = [];
        //use p5.js tool to get the drawing
        let img = get();
        img.resize(28,28);
        //console.log(img);
        img.loadPixels();
        for(let i = 0;i<len;i++){
            input[i] = 1-(img.pixels[i*4]/255.0);
        }
        //console.log(input);
        let prediction = nn.feedForward(input);
        prediction.print();
        let category = classification(prediction);
        //image(img,0,0);
        let categoryMsg = document.querySelector("#Category");
        categoryMsg.innerHTML = "This is a "+category;
    }
}
function setClearButton(){
    let button = document.querySelector("#ClearBtn");
    button.onclick = function(){
        background(255);
    }
}
function draw(){
    strokeWeight(16);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
//prediction is the output of nn.feedforward
function classification(prediction){
    let array = [];
    for(let i=0;i<prediction.rows;i++){
        array[i]=prediction.matrix[i][0];
    }
    let result="";
    if(prediction instanceof Matrix){
        let m = max(array);
        switch(array.indexOf(m)){
            case CAT:
                result = "cat";
                break;
            case FISH:
                result = "fish";
                break;
            case STRAWBERRY:
                result = "strawberry";
                break;
            default:
                result = "nothing";
        }
        return result;
    }
    else{
        throw new Error("[ERROR]The input should be a matrix.");
    }
}


