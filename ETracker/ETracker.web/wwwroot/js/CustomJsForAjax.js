$(document).ready(function () {
   // alert("Hay");
    ShowEmployeeData();
});

function ShowEmployeeData(){
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
                obj += '<td><a href="#" class="btn btn-primary" onclick="Edit('+item.id+')">Edit</a>||  <a href="#" onclick="Delete('+item.id+')" class="btn btn-danger">Delete</a></td>';
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
        
        stateof: $("#State").val(),
        nameof: $("#Name").val(),
        cityof: $("#City").val(),
        salaryof: $("#Salary").val()
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
}
function Delete(id) {
    if (confirm("Are you sure ?")) {
        $.ajax({
            url: '/Ajax/Delete?id=' + id,
            success: function () {
                alert("Record deleted");
                ShowEmployeeData();
            },
            error: function () {
                alert("Data can not be deleted");
            }
        });
    }
    
}

function HideModalPopUp() {
    $("#employeeModal").modal('hide');
}
function ClearTextBox() {
    $("#Name").val(''),
        $("#State").val(''),
        $("#City").val(''),
        $("#Salary").val('')
}
function Edit(id){
    $.ajax({
        url: '/Ajax/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charSet=utf-8;',
        dataType: 'json',
        success: function (response) {
            $("#employeeModal").modal("show");
            $("#Id").val(response.id);
            $("#Name").val(response.name);
            $("#State").val(response.state);
            $("#City").val(response.city);
            $("#Salary").val(response.salary);

            $("#AddEmployee").hide();
            $("#btnUpdate").show();
        },
        error: function () {
            alert("Data dont found");
        }
    });
}

function UpdateEmployee() {
    var objData = {
        Id:$("#Id").val(),
        Name: $("#Name").val(),
        State: $("#State").val(),
        City: $("#City").val(),
        Salary: $("#Salary").val()
    }
    $.ajax({
        url: '/Ajax/Edit',
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
}