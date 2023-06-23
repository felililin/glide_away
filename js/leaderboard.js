$(document).ready(function() {
    let penguins = ""
    penguinResult.forEach(function(row) {
        penguins += `<tr>
        <td>${row.username}</td>
        <td>${new Intl.NumberFormat().format(row.score)}</td>
        <td>${row.date}</td>
        </tr>`
    })
    $("#penguinTable").html(penguins)

    let blackJacks = ""
    blackJackResult.forEach(function(row) {
        blackJacks += `<tr>
        <td>${row.username}</td>
        <td>${new Intl.NumberFormat().format(row.score)}</td>
        <td>${row.date}</td>
        </tr>`
    })
    $("#blackJackTable").html(blackJacks)

    let fastFingers = ""
    fastFingerResult.forEach(function(row) {
        fastFingers += `<tr>
        <td>${row.username}</td>
        <td>${new Intl.NumberFormat().format(row.score)}</td>
        <td>${row.date}</td>
        </tr>`
    })
    $("#fastFingerTable").html(fastFingers)
})