import QtQuick
import QtQuick.Controls
import "components" as Components
ApplicationWindow {
	visible: true
	width: 400
	height: 300
	title: "Colony Idle"
	Row {
		height: parent.height / 10
		width: parent.width
		anchors.horizontalCenter: parent.horizontalCenter
		anchors.top: parent.top
		Components.TextSans {
			text: [
				"\u{1fab5}",
				"Wood:",
				game.getResource("wood")
			].join(" ")
		}
		Components.TextSans {
			text: [
				"\u{1faa8}",
				"Stone:",
				game.getResource("stone")
			].join(" ")
		}
		Components.TextSans {
			text: [
				"\u{1f356}",
				"Food:",
				game.getResource("food")
			].join(" ")
		}
		Components.TextSans {
			text: [
				"\u{1f9cd}",
				"Pop.:",
				game.getResource("population")
			].join(" ")
		}
	}
}
