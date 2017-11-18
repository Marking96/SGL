
//Script do menu
function menu() {
    $('.nav-toggle').click(function () {
        if ($(".nav").hasClass("side-fechado")) {
            $('.nav').animate({
                left: "0px",
            }, 100, function () {
                $(".nav").removeClass("side-fechado");
            });
        }
        else {
            $('.nav').animate({
                left: "-175px",
            }, 100, function () {
                $(".nav").addClass("side-fechado");
            });
        }
    });
}

//Menu Sidebar
$(window).resize(function () {
    var tamanhoJanela = $(window).width();
    $(".nav-toggle").remove();

    if (tamanhoJanela < 640) {
        $('.nav').css('left', '-175px').addClass('side-fechado');
        $('.nav').append("<div class='nav-toggle'><i class='material-icons'>menu</i></div>");
    } else {
        $('.nav').css('left', '0px').addClass('side-fechado');
    }

    menu();
});

$(document).ready(function () {
    var tamanhoJanela = $(window).width();
    $(".nav-toggle").remove();

    if (tamanhoJanela < 640) {
        $('.nav').css('left', '-175px').addClass('side-fechado');
        $('.nav').append("<div class='nav-toggle'><i class='material-icons'>menu</i></div>");
    } else {
        $('.nav').css('left', '0px').addClass('side-fechado');
    }

    menu();
});
//Fim do script do menu

//Script da Paginação tabela
function Pager(tableName, itemsPerPage) {
    this.tableName = tableName;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.pages = 0;
    this.inited = false;

    this.showRecords = function (from, to) {
        var rows = document.getElementById(tableName).rows;
        // i starts from 1 to skip table header row
        for (var i = 1; i < rows.length; i++) {
            if (i < from || i > to)
                rows[i].style.display = 'none';
            else
                rows[i].style.display = '';
        }
    }

    this.showPage = function (pageNumber) {
        if (!this.inited) {
            alert("not inited");
            return;
        }

        var oldPageAnchor = document.getElementById('pg' + this.currentPage);
        oldPageAnchor.className = 'pg-normal';

        this.currentPage = pageNumber;
        var newPageAnchor = document.getElementById('pg' + this.currentPage);
        newPageAnchor.className = 'pg-selected';

        var from = (pageNumber - 1) * itemsPerPage + 1;
        var to = from + itemsPerPage - 1;
        this.showRecords(from, to);
    }

    this.prev = function () {
        if (this.currentPage > 1)
            this.showPage(this.currentPage - 1);
    }

    this.next = function () {
        if (this.currentPage < this.pages) {
            this.showPage(this.currentPage + 1);
        }
    }

    this.init = function () {
        var rows = document.getElementById(tableName).rows;
        var records = (rows.length - 1);
        this.pages = Math.ceil(records / itemsPerPage);
        this.inited = true;
    }

    this.showPageNav = function (pagerName, positionId) {
        if (!this.inited) {
            alert("not inited");
            return;
        }
        var element = document.getElementById(positionId);

        var pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-ctrl"> &#171 </span>';
        for (var page = 1; page <= this.pages; page++)
            pagerHtml += '<span id="pg' + page + '" class="pg-normal" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span>';
        pagerHtml += '<span onclick="' + pagerName + '.next();" class="pg-ctrl"> &#187;</span>';

        element.innerHTML = pagerHtml;
    }
}

//Fim do script de paginação tabela

//Script de busca na tabela
$('#filtro_tabela').on('keyup', function () {
    var nomeFiltro = $(this).val().toLowerCase();
    $(".tb-licitacao tbody" ).find('tr').each(function () {
        var conteudoCelula = $(this).find('td').text();
        var corresponde = conteudoCelula.toLowerCase().indexOf(nomeFiltro) >= 0;
        $(this).css('display', corresponde ? '' : 'none');
    });
});

//Fim do script de busca na tabela