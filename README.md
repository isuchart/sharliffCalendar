# sharliffCalendar
sharliffCalendar_อ.เก๋ (แจก)

ส่วนเสริม Calendar Line bot เพิ่มเติมส่วนของ liff share สร้างปุ่มเพิ่มเติมใต้ Flex ปฏิทิน และทำให้สามารถแชร์ได้ทันที

## **จัดการส่วนของ Line Liff ก่อน**

 1. สร้าง liff ในฝั่ง [developersConsole](https://developers.line.biz/)   
 2. นำ code ทั้ง index และ javascript ไปใส่ใน [https://replit.com/](https://replit.com/)
 3. สองไฟล์ตั้งชื่อส่วน html อะไรก็ได้ แต่ javascript ให้ตั้งชื่อนี้ไปก่อน script.js 
 4. นำ liff id จากการสร้าง liff มาใส่ ที่ไฟล์ script.js บรรทัดที่สอง แทนที่ xxxxxxidliffxxxxxxx
 5. กด Run 
 6. นำลิงค์ replit ไปใส่เป็น Endpoint URL ในส่วนของ Developers Console
 7. กด Run แล้วก็สลับมาทำทาง Drive บ้าง ในส่วนจัดการ API และ Flex


## **จัดการส่วนของ API  เปลี่ยน id sheet ที่โคดนี้ด้วยอย่าลืม**

 1. คัดลอกโค๊ดต่อไปนี้ไปใส่ใน ส่วนของ appscript (สร้าง appscritpt ที่ drive หรือที่ Folder เก็บบอท)
 ```javascript 
 function converttoObjects(e) {
  var sheet = SpreadsheetApp.openById("ไอดีชีตที่เก็บข้อมูลกิจกรรมหรือชีตของบอตเรานั่นแหละ").getSheetByName("ชีต1") //ใส่ไอดี ชีต
  var range = sheet.getDataRange();
  var values = range.getValues();

  var data = [];
  for (var i = 1; i < values.length; i++) {
    var id = values[i][0];
    var date = Utilities.formatDate(new Date(values[i][1]), Session.getScriptTimeZone(), 'yyyy/M/d');
    var title = values[i][2];

    data.push({ id: id, date: date, title: title });
  }

  Logger.log(JSON.stringify(data)); // ล็อก JSON ในส่วนของสคริปต์

  return (data)
}


function doPost(e){
const data = converttoObjects(e);
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e){
const data = converttoObjects(e);
  console.log(JSON.stringify(e))

  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
 ```
2. หลังจากวางโค๊ดแล้ว ลอง dploy ให้เรียบร้อย แล้วนำลิงค์ .exec ไปใส่ที่ส่วน replit ที่ ไฟล์ script.js บรรทัด 22 

## **จัดการส่วนของ FLEX ใน สคริปต์ บอตตัวที่ได้จากผมไปตอนแรก สร้างปุ่ม ตามนี้ นำไปแทนที่ ส่วน footer เดิม ที่ calendar.gs ประมาณบรรทัดที่ 342 แล้วสังเกตุ uri action ให้นำ liffid มาแทนคำว่า .ไอดีliffวางตรงนี้. **
 ```javascript 
     footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "button",
              style: "primary",
              height: "sm",
              color: '#B15EFF',
              action: {
                type: "uri",
                label: "share ปฏิทินนี้",
                uri: "https://liff.line.me/ไอดีliffวางตรงนี้?key=a4&month="+monthcall
              }
            }, 
            {
              type: "text",
              text: "Code By Gukkghu # 2023",
              color: "#FFFFFF",
              weight: "regular",
              align: "end",
            }          
          ]
        }
      ],
      backgroundColor: "#176B87"
    }
  };
 ```    


ขอให้สนุกครับ
ผู้พัฒนา วรุณพร รัตนบุตรชัย 7/11/2023
