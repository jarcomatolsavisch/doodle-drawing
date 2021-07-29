//void settings() {
//  size(28*10, 28*10);
//}

//void draw(){
//size(28*10, 28*10);
//byte[] data = loadBytes("cat.npy");
byte[] data = loadBytes("fish.npy");
//byte[] data = loadBytes("cat.npy");
//int total = (data.length-80)/28/28;
int total = 1000;
byte[] outdata = new byte[total*784];
int outindex = 0;

println(data.length-80);
println(total);

  for(int n = 0; n < total; n++){
    int start = 80+784*n;
    PImage img = createImage(28,28,RGB);
    img.loadPixels();
    for(int i = 0; i < 784; i++){
      int index = start + i;
      byte val = data[index];
      outdata[outindex] = val;
      outindex++;
      img.pixels[i] = color(255 - val & 0xff);
    }
    img.updatePixels();
    int x = n%10;
    int y = n/10;
    image(img, x*28, y*28); 
  }
  saveBytes("fish1000.bin",outdata);
//}
