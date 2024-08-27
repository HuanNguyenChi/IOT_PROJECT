# How to use : 
  ## Clone repo : 
    git clone --depth 1 git@github.com:HuanNguyenChi/IOT_PROJECT.git
    
  ## Install it and run:
  ## Frontend 
        npm install
        npm start 
  ## Backend
      run on IDE Intellij 
# Information 
  I.	Giới thiệu đề tài
1.	Giới thiệu vấn đề
Biết được thông tin chỉ số của một phòng nhỏ và có thể điều khiển các thiết bị trong căn phòng thông qua một ứng dụng phần mềm.
2.	Đối tượng sử dụng 
Người sử dụng căn phòng để quản lí các thông số nhiệt độ, độ ẩm, ánh sáng... điều khiển các thiết bị điện tử để quản lí.
3.	Hướng giải quyết vấn đề trên
Phần cứng : 
-	Cảm biến DHT11
-	Cảm biến ánh sáng
-	ESP8266
Phần mềm: 
-	Client: Reactjs
-	Server: Java Springboot
-	Protocol: MQTT
II.	Giới thiệu giao diện 
1.	Trang chủ dashboard

 ![Hình 2.1: Giao diện dashboard](https://github.com/HuanNguyenChi/IOT_PROJECT/blob/0abd4c613eace578d2ff8fb506c219f9e7c3c836/Screenshot%20(5).png)

-	Các chức năng chính của trang dashboard
o	Chức năng hiện thị các thông số cảm biến
o	Hiện thị sự biến đổi của các thông số trong phòng
o	Điều khiển các thiết bị
2.	Trang hiện thị các kết quả của cảm biến
  ![Hình 2.2: Giao diện lịch sử cảm biến](https://github.com/HuanNguyenChi/IOT_PROJECT/blob/0abd4c613eace578d2ff8fb506c219f9e7c3c836/Screenshot%20(6).png)

-	Các chức năng chính
o	Hiện thị các thông số của cảm biến theo thời gian thực
o	Lọc thông tin theo các trường thông số cảm biến, sắp xếp, và theo khoảng thời gian cách hiện tại
o	Phân trang 

3.	Trang hiện thị lịch sử điều khiển các thiết bị
  ![Hình 2.3: Giao diện lịch sử điều khiển thiết bị](https://github.com/HuanNguyenChi/IOT_PROJECT/blob/0abd4c613eace578d2ff8fb506c219f9e7c3c836/Screenshot%20(7).png)

-	Các chức năng chính
o	Hiện thị lịch sử điều khiển thiết bị
o	Sắp xếp và lọc theo thời gian
o	Phân trang
4.	Trang profile
  ![Hình 2.4: Giao diện profile](https://github.com/HuanNguyenChi/IOT_PROJECT/blob/0abd4c613eace578d2ff8fb506c219f9e7c3c836/Screenshot%20(8).png)

-	Các chức năng chính 	
o	Hiện thị thông tin, các đường dẫn đến trang liên quan
