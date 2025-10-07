#!/usr/bin/env python3
from PySide6.QtCore import QObject, Signal, Slot, Property, QUrl
from PySide6.QtQml import QQmlApplicationEngine
from PySide6.QtGui import QGuiApplication
import sys, os
def path(*loc):
	return os.path.join(*loc)
class ResourceManager(QObject):
	resourcesChanged = Signal()
	def __init__(self):
		super().__init__()
		self._resources = {
			"wood": 100,
			"stone": 50,
			"food": 75,
			"population": 10
		}
	def getResources(self):
		return self._resources
	@Slot(str, int)
	def setResource(self, key, value):
		if key in self._resources and self._resources[key] != value:
			self._resources[key] = value
			self.resourcesChanged.emit()
	@Slot(str, int)
	def addResource(self, key, amount):
		if key in self._resources:
			self._resources[key] += amount
			self.resourcesChanged.emit()
	resources = Property(object, getResources, notify=resourcesChanged)
	@Slot(str, result=int)
	def getResource(self, key):
		return self._resources.get(key, 0)
	def __del__(self):
		try:
			self.resourcesChanged.disconnect()
		except TypeError:
			pass
app = QGuiApplication(sys.argv)
engine = QQmlApplicationEngine()
manager = ResourceManager()
engine.rootContext().setContextProperty("game", manager)
engine.load(QUrl.fromLocalFile(path("main.qml")))
if not engine.rootObjects():
	sys.exit(-1)
sys.exit(app.exec())
