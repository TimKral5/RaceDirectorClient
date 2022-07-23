rmdir "RD-Server/client" /S /Q
xcopy "RD-Client/public" "RD-Server/client" /s /i /Y
cd RD-Server
node server.js
cd ..