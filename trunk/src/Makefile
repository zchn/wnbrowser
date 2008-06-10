
all:jawsTest.class jgraphTest.class

jawsTest.class:jawsTest.java
	javac -cp "./lib/jaws.jar" jawsTest.java

jgraphTest.class:jgraphTest.java
	javac -cp "./lib/jgraph.jar:./lib/jgrapht.jar" jgraphTest.java

run:
	java -cp "./lib/jgraph.jar:./lib/jgrapht.jar:." jgraphTest

clean:
	rm *.class
