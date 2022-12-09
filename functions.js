let usr = document.getElementById('usr');
let Name = document.getElementById('Name');
let date = document.getElementById('date');
let programm = document.getElementById('programm');

document.getElementById('add').onclick=ADD;
document.getElementById('convert').onclick=Convert;
document.getElementById('rad_pro').onclick=SORT_BY_PRO;
document.getElementById('rad_name').onclick=SORT_BY_NAME;
document.getElementById('rad_num').onclick=SORT_BY_NUM;
document.getElementById('program').onchange=fltr;
document.getElementById('Refresh').onclick=generateCaptcha;
document.getElementById('body').onload=generateCaptcha;

    let data;
    let mood = 'create';
    let temp;

    //التحقق من وجود بيانات داخل الذاكرة

    if(localStorage.students_info != null){
        data=JSON.parse(localStorage.students_info)
    }
    else{
        data=[];
    }
    
    //التحقق من صحة المدخلات

    function chek(){

        let _usr = usr.value.search(/[A-Z][a-z]{1,9}\_[0-9]{4,9}$/);
    
        let _Name = Name.value.search(/[\u0600-\u06FF]/);
    
        let _tel = tel.value;
        let phone_1 = _tel.search(/\+\963\-\9\d{8}$/);
        let phone_2 = _tel.search(/\+\d{1,4}\-\d{7}$/);
    

        let input = document.getElementById("inputText").value;
    
        if(input == captcha){
            if (_usr >= 0 && phone_1 >= 0 && _Name >= 0){
    
                return true;
            }
            else if(_usr >= 0 && phone_2 >= 0 && _Name >= 0){
        
                return true;
            }
            else{

                alert('يرجى التحقق من حالة الإدخالات')
                return false;
            }
        }
        else{
            alert("رمز كابتشا غير صحيح");
            return false;
        }
    }

    //اضافة البيانات

    function ADD(){

        
        if(chek()){

            let obj = {
                usr:usr.value,
                Name:Name.value,
                date:date.value,
                programm:programm.value,
                tel:tel.value
            }
    
                if(mood === 'create'){
                    if(obj.count > 1){
                        for(let i = 0 ; i < obj.count ; i++){
                            data.push(obj);
                        }
                    }
                    else{
                        data.push(obj);
                    }
                }
                else{
                    data[temp] = obj;
                    mood = 'create';
                    creat.innerHTML = 'create';
                    count.style.display = 'block';
                }
                clear();
          
        
            //save in local
            localStorage.setItem('students_info',JSON.stringify(data));
            alert('تم اضافة البيانات')
        }


        show();
    }

    //تفريغ محتويات المدخلات

    function clear(){
        usr.value='';
        Name.value='';
        tel.value='';

    }

    // قراءة البيانات

    function show(){
        let table ='';
        for(let i = 0; i< data.length; i++){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${data[i].usr}</td>
            <td>${data[i].Name}</td>
            <td>${data[i].programm}</td>
            </tr>
            `
        }

        document.getElementById('t-body')
        .innerHTML = table;
    }
    show();
    
    //تحويل الى JSON

    function Convert(){

        let JSON_converted = JSON.stringify(data);
        $("#json_container").text(JSON_converted);
        $("#json_container").css({'width':'100%','height':'150px'});
        $('#div_json').removeAttr('hidden');

    }

    //الترتيب بحسب

    function SORT_BY_PRO(){

        data.sort(function(a,b){

            if (a.programm.toLowerCase() < b.programm.toLowerCase())
            return -1;
            if (a.programm.toLowerCase() > b.programm.toLowerCase())
            return 1;
            return 0;
        });
        show();
    }

    function SORT_BY_NAME(){

        data.sort(function(a,b){

            if (a.Name < b.Name)
            return -1;
            if (a.Name > b.Name)
            return 1;
            return 0;
        });
        show();
    }

    function SORT_BY_NUM(){


        show();
    }

    // فلترة بحسب البرنامج

    let data2;
    function fltr(){

        let x = document.getElementById('program').value;

        if(x==='BAIT'){
            data2 = data.filter(type => type.programm === 'BAIT');
            show2();
        }
        else if(x==='TIC'){
            data2 = data.filter(type => type.programm === 'TIC');
            show2();
        }
        else if(x==='ITE'){
            data2 = data.filter(type => type.programm === 'ITE');
            show2();
        }
        else{
            show();
        }

    }
    function show2(){
        let table ='';
        for(let i = 0; i< data2.length; i++){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${data2[i].usr}</td>
            <td>${data2[i].Name}</td>
            <td>${data2[i].programm}</td>
            </tr>
            `
        }

        document.getElementById('t-body')
        .innerHTML = table;
    }

    //توليد رمز كابتشا
    


    let captcha;
 
    function generateCaptcha() {
    var a = Math.floor((Math.random() * 9999999 ));
 
    captcha = a.toString();
    document.getElementById("captcha").value = captcha;
}