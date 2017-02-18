import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.Event
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document

val canvas = document.getElementById("canvas") as HTMLCanvasElement
val context = canvas.getContext("2d") as CanvasRenderingContext2D
val rowSize = 3
var pieces = intArrayOf(8, 7, 6, 5, 4, 3, 2, 1, 0)
val pieceSize = 100.0
val cornerRadius = 20.0

fun main(args: Array<String>) {
    drawBoard()
    canvas.addEventListener("click", { onClick(it) })
}

fun drawBoard() {
    context.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
    pieces.forEachIndexed { index, item ->
        if (item != 0) {
            val x = index.mod(3) * pieceSize
            val y = index / 3 * pieceSize
            context.fillStyle = "#333"
            context.lineJoin = "round"
            context.lineWidth = cornerRadius
            context.strokeRect(x + cornerRadius / 2, y + cornerRadius / 2, pieceSize - cornerRadius, pieceSize - cornerRadius)
            context.fillRect(x + cornerRadius / 2, y + cornerRadius / 2, pieceSize - cornerRadius, pieceSize - cornerRadius)
            context.fillStyle = "#ee1"
            context.font = "50pt Calibri"
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillText(item.toString(), x + pieceSize / 2, y + pieceSize / 2)
        }
    }
}

fun onClick(e: Event) {
    val event = e as MouseEvent
    val rect = canvas.getBoundingClientRect()
    val x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width
    val y = (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    val xIndex = Math.floor(x / pieceSize)
    val yIndex = Math.floor(y / pieceSize)
    if (0 <= xIndex && xIndex <= rowSize && 0 <= yIndex && yIndex <= rowSize) {
        val index = xIndex + (yIndex * 3)
        val item = pieces[index]
        if (item != 0) {
            val indexOfZero = pieces.indexOf(0)
            if (index + 1 == indexOfZero || index - 1 == indexOfZero || index + rowSize == indexOfZero || index - rowSize == indexOfZero) {
                pieces[indexOfZero] = item
                pieces[index] = 0
                val solved = pieces.foldIndexed(true, {index, result, item ->
                    result && (item == index + 1 || item == 0)
                })
                if (solved) {
                    println("Congratulation!!")
                }
                drawBoard()
            }
        }
    }
}
