# ใช้ Node.js image เป็นพื้นฐาน
FROM node:18

# ตั้งค่าโฟลเดอร์ทำงานใน container
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดจาก local machine ไปยัง container
COPY . .

# เปิดพอร์ตที่ server จะรัน (เปลี่ยนเป็น 3000)
EXPOSE 3000

# เริ่มต้น server
CMD ["npm", "start"]
