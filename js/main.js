$(document).ready(function () {
    $("#todoText").focus();

    colors = ["red", "lightgreen", "yellow", "green", "cyan"];
    colorIndex = 0;

    //show tasks if they are already exist
    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            $("#todoList").append(
                "<div class='task magenta " + colors[colorIndex] + "' data-id='task'>" +
                "<div class='task-text'>" + todo + "</div >" +
                "<div class='btn'>" +
                "<button class='compTask'><i class='far fa-check-circle'></i></button> " +
                "<button class='delTask'><i class='far fa-trash-alt'></i></button> " +
                "</div> " +
                "</div > "
            );
            colorIndex++;
            if (colorIndex >= 5) {
                colorIndex = 0;
            }
        });
    }

    //add new task
    $("#todoForm").submit(function (e) {
        e.preventDefault();

        text = $("#todoText").val();

        $("#todoText").val("");

        if (!text || /^\s*$/.test(text)) {
            return;
        }

        const task = "<div class='task magenta " + colors[colorIndex] + "' data-id='task'>" +
            "<div class='task-text'>" + text + "</div >" +
            "<div class='btn'>" +
            "<button class='compTask'><i class='far fa-check-circle'></i></button> " +
            "<button class='delTask'><i class='far fa-trash-alt'></i></button> " +
            "</div> " +
            "</div > ";

        colorIndex++;
        if (colorIndex >= 5) {
            colorIndex = 0;
        }
        $("#todoList").append(task);

        var todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        todos.push(text);

        //set to localstorage
        localStorage.setItem("todos", JSON.stringify(todos));
    });


    //complete task

    $(document).on("click", ".compTask", function (e) {
        $(this).parent().parent().toggleClass("complete");
        var btnClass = "";
        if ($(this).children("i").hasClass("far")) {
            $(this).children("i").removeClass("far");
            $(this).children("i").addClass("fas");
            btnClass = "fas";
        } else {
            $(this).children("i").removeClass("fas");
            $(this).children("i").addClass("far");
            btnClass = "far";
        }
    });

    //delete task 

    $(document).on("click", ".delTask", function (e) {
        $(this).parent().parent().animate({
            height: 0,
            padding: 0,
            width: 0
        }, 700, () => {
            $(this).parent().parent().remove();
        });

        var todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const deleteText = $(this).parent().parent().children(".task-text").text().trim();

        todos.splice(todos.indexOf(deleteText), 1);
        
        localStorage.setItem("todos", JSON.stringify(todos));   
    });
});
