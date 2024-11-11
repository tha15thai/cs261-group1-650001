# ใช้ Node.js image เป็นพื้นฐาน
FROM node:18

# ติดตั้งไลบรารี `libodbc` ที่จำเป็นสำหรับ msnodesqlv8
RUN apt-get update && apt-get install -y \
    unixodbc \
    unixodbc-dev \
    && rm -rf /var/lib/apt/lists/*

# ตั้งค่าโฟลเดอร์ทำงานใน container
WORKDIR /app

# คัดลอก package.json และ package-lock.json ไปยัง container
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดจากเครื่องเราไปยัง container
COPY . .

# เปิดพอร์ตที่ server จะรัน (เปลี่ยนเป็น 5501)
EXPOSE 5501

# เริ่มต้น server ด้วยการใช้คำสั่ง node --watch
CMD ["node", "--watch", "server.js"]
