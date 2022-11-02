//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var next = 0;

$(document).ready(function () {
    $(".next").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'position': 'absolute'
                });
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });
});

$(document).ready(function () {
    $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });
});

$(".submit").click(function () {
    return false;
})
var fileName;

// image drag and drop
function fileValue(value) {
    var path = value.value;
    var extenstion = path.split('.').pop();
    if (extenstion == "jpg" || extenstion == "svg" || extenstion == "jpeg" || extenstion == "png" || extenstion == "gif") {
        document.getElementById('image-preview').src = window.URL.createObjectURL(value.files[0]);
        var filename = path.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
        document.getElementById("filename").innerHTML = filename;
        fileName = filename;
    } else {
        alert("File not supported. Kindly Upload the Image of below given extension ")
    }
}

var row_len, dmg, def, ctk;
var o1, o2, o3;
var c = 0;
var excel_dic = new Array();

function tableadd() {
    var n = document.getElementById('nname').value;
    var n2 = document.getElementById('cclas').value;
    var n3 = document.getElementById('minAtk').value;
    var n4 = document.getElementById('maxdmg').value;
    var n5 = document.getElementById('str').value;
    var n6 = document.getElementById('def').value;
    var n7 = document.getElementById('ctk').value;
    var n8 = document.getElementById('msp').value;
    var n9 = document.getElementById('weapon').value;
    var n10 = document.getElementById('formula').value;


    let add_html = `<td>1</td>
  <td>${n}</td>
 <td>${n2}</td>
<td>${n3}</td>
 <td>${n4}</td>
 <td>${n5}</td>
 <td>${n6}</td>
 <td>${n7}</td>
 <td>${n8}</td>
 <td>${n9}</td>
 <td>${n10}</td>
`
    $('#check_submit').append(add_html);
}

function AvDmg() {
    var tmp = 0;
    var sum = 0;
    if (document.getElementById('minAtk').value != "")
        tmp += Number(document.getElementById('minAtk').value);
    if (document.getElementById('maxdmg').value != "")
        tmp += Number(document.getElementById('maxdmg').value);

    sum = String(tmp / 2);
    document.getElementById('str').value = sum;
}

function readExcel(input) {
    alert("upload complete");
    let reader = new FileReader();
    reader.onload = function () {
        let data = reader.result;
        let workBook = XLSX.read(data, {type: 'binary'});
        workBook.SheetNames.forEach(function (sheetName) {
            console.log('SheetName: ' + sheetName);
            let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
            row_len = rows.length;
            excel_dic = rows;
            console.log(JSON.stringify(excel_dic));

        })
    };
    reader.readAsBinaryString(input.files[0]);
}

function chageLangSelect() {
    var langSelect = document.getElementById("weapon");

    if (c == 0) {
        o1 = document.getElementById('maxdmg').value;
        o2 = document.getElementById('def').value;
        o3 = document.getElementById('ctk').value;
        c++;
    }
    alert("무기 수치 적용 완료");
    // select element에서 선택된 option의 value가 저장된다.
    var selectValue = langSelect.options[langSelect.selectedIndex].value;


    for (let i = 0; i < row_len; i++) {
        if (selectValue == excel_dic[i]["type"]) {
            console.log(excel_dic[i]);
            dmg = excel_dic[i]["damage"];
            def = excel_dic[i]["defense"];
            ctk = excel_dic[i]["critical"];

            document.getElementById('maxdmg').value = String(Number(document.getElementById('maxdmg').value) + Number(dmg));
            document.getElementById('def').value = String(Number(document.getElementById('def').value) + Number(def));
            document.getElementById('ctk').value = String(Number(document.getElementById('ctk').value) + Number(ctk));
            AvDmg();
        }
        if (selectValue == "Weapon Type") {
            document.getElementById('maxdmg').value = o1;
            document.getElementById('def').value = o2;
            document.getElementById('ctk').value = o3;
            AvDmg();
        }

    }


    // select element에서 선택된 option의 text가 저장된다.
    var selectText = langSelect.options[langSelect.selectedIndex].text;
}

function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);

        };

        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});
