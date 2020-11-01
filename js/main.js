/* Variable scope may cause problem 
   so decare there before doc ready
*/
var taskComplete;
var taskDelete;
$(document).ready(function () {

    //load all the previouly added tasks
    for (let i = localStorage.length - 1; i >= 0; i--) {
        $("#todoList").append(localStorage.getItem(localStorage.key(i)));
    }

    //focus to input on page load
    $("#todoText").focus();

    //color array
    var colors = ['orange', 'green', 'yellow', 'magenta', 'cyan'];
    var colorIndex = 0;
    //add task on todo list
    $("#todoForm").submit(function (e) {
        e.preventDefault();
        const text = $("#todoText").val();
        $("#todoText").val("");
        $("#todoText").focus();

        //don't add if text has only whitespaces or tabs
        //and return 
        if (!text || /^\s*$/.test(text)) {
            return;
        }

        //unique id for a task
        tid = Math.floor(Math.random() * 10000);

        task = "<div class=\'task " + colors[colorIndex] + "\' data-id=\'task" + tid + "\'> " +
            "<div class='task-text'>" + text + "</div> " +
            "<div class='btn'>" +
            "<button value=\'task" + tid + "\' id='compTask' onClick='taskComplete(this.value);'><i class='far fa-check-circle'></i></button>" +
            "<button value=\'task" + tid + "\' id='delTask' onClick='taskDelete(this.value);'><i class='far fa-trash-alt'></i></button>" +
            "</div>" +
            "</div>";

        $("#todoList").append(task);

        localStorage.setItem("task" + tid, task);

        colorIndex++;
        if (colorIndex >= 5) {
            colorIndex = 0;
        }
    });

    //complete function 
    taskComplete = function (val) {
        $('[data-id="' + val + '"]').addClass('complete').css("background", "#ffffff");
        $('[data-id="' + val + '"] #compTask i').removeClass('far');
        $('[data-id="' + val + '"] #compTask i').addClass('fas');
        text = $('[data-id="' + val + '"] .task-text').text();

        //updating task
        task = "<div class=\'task white complete\' data-id=\'" + val + "\'> " +
            "<div class='task-text'>" + text + "</div> " +
            "<div class='btn'>" +
            "<button disabled value=\'" + val + "\' id='compTask' onClick='taskComplete(this.value);'><i class='fas fa-check-circle'></i></button>" +
            "<button value=\'" + val + "\' id='delTask' onClick='taskDelete(this.value);'><i class='far fa-trash-alt'></i></button>" +
            "</div>" +
            "</div>";

        localStorage.setItem(val, task);
    }

    taskDelete = function (val) {
        $('[data-id="' + val + '"]').fadeOut(200);
        localStorage.removeItem(val);
    }
});
