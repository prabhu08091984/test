$(document).ready(function () {
    if (localStorage.getItem('ProductList') != null || localStorage.getItem('ProductId')) {
        localStorage.removeItem('ProductList');
        localStorage.removeItem('ProductId');   
    }
});

function AddItem() {
    var Product = $('#Product').val();
    var ProductSource = $('#ProductSource').val();
    var Quantity = $('#Quantity').val();
    $('#tblAddlineitem tbody').empty();
    for (var i = 0; i < Quantity; i++) {
        var tr = '<tr>';
        tr += "<td> <input type='text' id='SerialNumber_" + i + "'/></td>";
        tr += "<td> <input type='text' id='FailureReason_" + i + "'/></td>";
        tr += "<td> <input type='text' id='DistributorOrderNumber_" + i + "'/></td>";
        tr += "</tr>";
        $('#tblAddLineItem tbody').append(tr);
    }
}

function InsertItem() {
    var StorageProductId = localStorage.getItem('ProductId');
    var ProductList = [];
    var ProductId = $('#Product').val();
    var ProductSource = $('#ProductSource').val();
    var Quantity = $('#Quantity').val();

    var ProductItems = [];
    for (var i = 0; i < Quantity; i++) {
        var values = {
            SerialNumber: $("#SerialNumber_" + i).val(),
            FailureReason: $("#FailureReason_" + i).val(),
            DistributorOrderNumber: $("#DistributorOrderNumber_" + i).val()
        };
        ProductItems.push(values);
    }
    if (StorageProductId == ProductId) {
        var ProductList = localStorage.getItem('ProductList');
        var Products = JSON.parse(ProductList);
        var index = Products.map(function (a) { return a.ProductId; }).indexOf(ProductId);
        Products[index].Items = Products[index].Items.concat(ProductItems);
        Products[index].Quantity = parseInt(Products[index].Quantity) + parseInt(Quantity);
        $("#tblProductItem").find("." + ProductId + " " + ".Quantity").html(Products[index].Quantity);

        localStorage.setItem('ProductList', JSON.stringify(Products));
    }

    else {
        var Product = { ProductId: ProductId, ProductSource: ProductSource, Quantity: Quantity, Items: ProductItems };
        if (localStorage.getItem('ProductList') === null) {
            ProductList.push(Product);
            localStorage.setItem('ProductList', JSON.stringify(ProductList));
        }
        else {
            productList = localStorage.getItem('ProductList');
            var Products = JSON.parse(productList);
            Products.push(Product);
            localStorage.setItem('ProductList', JSON.stringify(Products));
        }
        var tr = '<tr class=' + ProductId + '>';
        tr += "<td>" + ProductId + "</td>";
        tr += "<td>" + ProductSource + "</td>";
        tr += "<td class=Quantity>" + Quantity + "</td>";
        tr += "<td><input type='button' class ='productid' onclick= EditItem('" + ProductId + "') Value = 'Edit' /> <button onclick=ViewItem(" + Product + ") Value = View /> <button onclick=DeleteItem(" + Product + ") Value = Delete /></td>";
        tr += "<td><input type='button' onclick=AddMoreItem('" + ProductId + "') Value = 'AddMoreItem' /></td>";
        $('#tblProductItem tbody').append(tr);
    }
}

function EditItem(ProductId) {
    var ProductList = localStorage.getItem('ProductList');
    var Products = JSON.parse(ProductList);
    var index = Products.map(function (a) { return a.ProductId; }).indexOf(ProductId);
    $('#Product').val(Products[index].ProductId);
    $('#ProductSource').val(Products[index].ProductSource);
    $('#Quantity').val(Products[index].Quantity);
    $('#tblAddLineItem tbody').empty();
    for (var i = 0; i < Products[index].Items.length; i++) {
        var tr = '<tr>';
        tr += "<td> <input type='text' id='SerialNumber_" + i + "' value=" + Products[index].Items[i].SerialNumber + " /></td>";
        tr += "<td> <input type='text' id='FailureReason_" + i + "' value=" + Products[index].Items[i].FailureReason + "/></td>";
        tr += "<td> <input type='text' id='DistributorOrderNumber_" + i + "' value=" + Products[index].Items[i].DistributorOrderNumber + "/></td>";
        $('#tblAddLineItem tbody').append(tr);
    }
    //Create Update button in popup and Call the UpdateItem function in button onlick then Pass ProductId in UpdateItem function.
}


function AddMoreItem(ProductId) {
    var ProductList = localStorage.getItem('ProductList');
    var Products = JSON.parse(ProductList);
    var index = Products.map(function (a) { return a.ProductId; }).indexOf(ProductId);
    localStorage.setItem('ProductId', Products[index].ProductId);
    $('#Product').val(Products[index].ProductId);
    $('#ProductSource').val(Products[index].ProductSource);
    $('#Quantity').val('');
    $('#tblAddLineItem tbody').empty();
    //Disable Search Button
}


function UpdateItem(ProductId) {
    var ProductList = localStorage.getItem('ProductList');
    var Products = JSON.parse(ProductList);
    var index = Products.map(function (a) { return a.ProductId; }).indexOf(ProductId);
    var Quantity = $('#Quantity').val();

    var ProductItems = [];
    for (var i = 0; i < Quantity; i++) {
        var values = {
            SerialNumber: $("#SerialNumber_" + i).val(),
            FailureReason: $("#FailureReason_" + i).val(),
            DistributorOrderNumber: $("#DistributorOrderNumber_" + i).val()
        };
        ProductItems.push(values);
    }

    Products[index].Items = [];
    Products[index].Items.push(ProductItems);
    localStorage.setItem('ProductList', JSON.stringify(Products));
}

