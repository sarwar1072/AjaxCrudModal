$(document).ready(function () {
   // alert("Hay");
    ShowEmployeeData();
});

function ShowEmployeeData() {
    debugger
    var URLl = $("#IdHidden").val();
    $.ajax({
        url: URLl,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charSet=utf-8;',
        success: function (result, status, xhr) {
            var obj = '';
            $.each(result, function (index, item) {
                obj += '<tr>';
                obj += '<td>' + item.id + '</td>';
                obj += '<td>' + item.name + '</td>';
                obj += '<td>' + item.city + '</td>';
                obj += '<td>' + item.state + '</td>';
                obj += '<td>' + item.salary + '</td>';
                obj += '<td><a href="#" class="btn btn-primary">Edit</a>  <a href="#" class="btn btn-danger">Delete</a></td>';
                obj += '</tr>';
            });
            $("#table_Data").html(obj);
        },
        error: function () {
            alert("data can not be fetch");
        }

    });
};
$("#btnAddEmployee").click(function () {
    $("#employeeModal").modal('show');
})

function AddEmployee() {
    var objData = {
        Name: $("#Name").val(),
        State: $("#State").val(),
        City: $("#City").val(),
        Salary: $("#Salary").val()
    }
    $.ajax({
        url: '/Ajax/AddEmployee',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charSet=utf-8;',
        dataType: 'json',
        success: function () {
            alert("data saved");
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("data can not save");
        }

    });
    function HideModalPopUp() {
        $("#employeeModal").modal('hide');
    }
    function ClearTextBox() {
        $("#Name").val(''),
        $("#State").val(''),
        $("#City").val(''),
        $("#Salary").val('')
    }
}