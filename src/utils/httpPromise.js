let get = function (url) {
    let promise = new Promise (function (resolve, reject) {
        function handler () {
            if (this.status === 200) {
                resolve();
            } else {
                reject(new Error(this.statusText));
            }
        };
        let client = new XMLHttpRequest();
        client.open("GRT", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
    })
}

//应用
get('url').then(function (res) {
    console.log(res);
}, function (error) {
    console.error(error);
});