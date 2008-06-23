
all:Main.class

#jawsTest.class:jawsTest.java
#	javac -cp "./lib/jaws.jar" jawsTest.java

#jgraphTest.class:jgraphTest.java
#	javac -cp "./lib/jgraph.jar:./lib/jgrapht.jar" jgraphTest.java

Main.class:Main.java MainWindow.class
	javac -cp "." Main.java

MainWindow.class:MainWindow.java
	javac -cp "./lib/jaws.jar:./lib/jgraph.jar:./lib/jgrapht.jar" MainWindow.java

run:
	java -cp "./lib/jaws.jar:./lib/jgraph.jar:./lib/jgrapht.jar:." Main

clean:
	rm *.class
