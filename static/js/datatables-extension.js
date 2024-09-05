$(function () {
    $.fn.dataTable.ext.type.order['uptime-pre'] = function (a) {
        var result = /((\d+) days?, )?(\d+):(\d+):(\d+)/g.exec(a);
        if (result === null)
            return 0;

        var seconds = 0;
        if (result[2] !== undefined)
            seconds += parseInt(result[2]) * 86400;

        seconds += parseInt(result[3]) * 3600 + parseInt(result[4]) * 60 + parseInt(result[5]);
        return seconds;
    };

    $.fn.dataTable.ext.type.order['bandwidth-pre'] = function (a) {
        var result = /([0-9.]+)\s*([GgMmKk]bit\/s)/g.exec(a);
        if (result === null)
            return 0;

        var unit = result[2][0];

        if (unit === 'G' || unit === 'g')
            return parseFloat(result[1]) * 1000000000;
        if (unit === 'M' || unit === 'm')
            return parseFloat(result[1]) * 1000000;
        if (unit === 'k' || unit === 'k')
            return parseFloat(result[1]) * 1000;

        return parseFloat(result[1]);
    };

    $.fn.dataTable.ext.type.order['filesize-pre'] = function (a) {
        var result = /([0-9.]+)\s*( kB|MB|GB|KiB|MiB|GiB)/g.exec(a);
        if (result === null)
            return 0;

        if (result[2] === 'GB')
            return parseFloat(result[1]) * 1000000000;
        if (result[2] === 'MB')
            return parseFloat(result[1]) * 1000000;
        if (result[2] === 'kB')
            return parseFloat(result[1]) * 1000;

        if (result[2] === 'GiB')
            return parseFloat(result[1]) * 1073741824;
        if (result[2] === 'MiB')
            return parseFloat(result[1]) * 1048576;
        if (result[2] === 'KiB')
            return parseFloat(result[1]) * 1024;

        return parseFloat(result[1]);
    };

    $.fn.dataTable.ext.type.order['number-pre'] = function (a) {
        return parseFloat(a);
    };

    $.fn.dataTable.ext.type.order['input-string-pre'] = function (a) {
        return $(a).val();
    };

    $.fn.dataTable.ext.type.order['input-number-pre'] = function (a) {
        return parseFloat($(a).val());
    };

    $.fn.dataTable.ext.type.order['videosize-pre'] = function (a) {
        var result = /(\d+)x(\d+)@(\d+)/g.exec(a);
        return ((parseInt(result[1]) * parseInt(result[2])) << 8) + parseInt(result[3]);
    };
});