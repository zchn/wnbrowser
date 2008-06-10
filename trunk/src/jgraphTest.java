import javax.swing.*;
import org.jgraph.*;
import org.jgrapht.*;

import java.awt.*;
import java.awt.geom.Rectangle2D;

import java.util.HashMap;
import java.util.Map;

import org.jgraph.JGraph;
import org.jgraph.graph.DefaultGraphCell;
import org.jgraph.graph.GraphConstants;
import org.jgraph.graph.AttributeMap;
    
import org.jgrapht.ext.JGraphModelAdapter;
import org.jgrapht.graph.ListenableDirectedGraph;
import org.jgrapht.graph.DefaultEdge;

public class jgraphTest {
    static JGraphModelAdapter m_jgAdapter;    
    public static void main(String[] args) {

        String strTest[] = new String[500];
        JFrame frame = new JFrame();
        Container con;
        con = frame.getContentPane();

        // create a JGraphT graph
        ListenableGraph g = new ListenableDirectedGraph( DefaultEdge.class );      
        // create a visualization using JGraph, via an adapter
        m_jgAdapter = new JGraphModelAdapter( g );        
        JGraph jgraph = new JGraph( m_jgAdapter );


        JPanel upPane = new JPanel();
        upPane.add( new JTextField(20) );
        upPane.add( new JButton("Search") );
        JSplitPane contPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                             upPane,
                                             new JScrollPane(jgraph));
        

        con.add(contPane);

        //frame.resize( DEFAULT_SIZE );

        Integer ii = new Integer(0);
        g.addVertex( "root" );            
        for(int i = 0; i < 10; i++){
            ii = i;
            g.addVertex( ii.toString() );                         
            g.addEdge( "root", ii.toString() );
            positionVertexAt(ii.toString(),700-i*70,i*70);
        }
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.validate();
        frame.pack();
        frame.setResizable(false);
        frame.setVisible(true);
    }
    private static void positionVertexAt( Object vertex, int x, int y ) {
        DefaultGraphCell cell = m_jgAdapter.getVertexCell( vertex );
        AttributeMap attr = cell.getAttributes(  );
        //attr.applyValue("x",x);
        //attr.applyValue("y",y);        
        Rectangle2D.Double b = (Rectangle2D.Double) GraphConstants.getBounds( attr );

        GraphConstants.setBounds( attr, new Rectangle( x, y, (int)b.width, (int)b.height ) );

        //Map cellAttr = new HashMap(  );
        //cellAttr.put( cell, attr );
        cell.setAttributes(new AttributeMap(attr));
    }
}

// public class HelloWorld {
//     public static void main(String[] args) {
//         GraphModel model = new DefaultGraphModel();
//         GraphLayoutCache view = new GraphLayoutCache(model,
//                                                      new
//                                                      DefaultCellViewFactory());
//         JGraph graph = new JGraph(model, view);
//         DefaultGraphCell[] cells = new DefaultGraphCell[3];
//         cells[0] = new DefaultGraphCell(new String("Hello"));
//         GraphConstants.setBounds(cells[0].getAttributes(), new
//                                  Rectangle2D.Double(20,20,40,20));
//         GraphConstants.setGradientColor(
//                                         cells[0].getAttributes(),
//                                         Color.orange);
//         GraphConstants.setOpaque(cells[0].getAttributes(), true);
//         DefaultPort port0 = new DefaultPort();
//         cells[0].add(port0);
//         cells[1] = new DefaultGraphCell(new String("World"));
//         GraphConstants.setBounds(cells[1].getAttributes(), new
//                                  Rectangle2D.Double(140,140,40,20));
//         GraphConstants.setGradientColor(
//                                         cells[1].getAttributes(),
//                                         Color.red);
//         GraphConstants.setOpaque(cells[1].getAttributes(), true);
//         DefaultPort port1 = new DefaultPort();
//         cells[1].add(port1);
//         DefaultEdge edge = new DefaultEdge();
//         edge.setSource(cells[0].getChildAt(0));
//         edge.setTarget(cells[1].getChildAt(0));
//         cells[2] = edge;
//         int arrow = GraphConstants.ARROW_CLASSIC;
//         GraphConstants.setLineEnd(edge.getAttributes(), arrow);
//         GraphConstants.setEndFill(edge.getAttributes(), true);
//         graph.getGraphLayoutCache().insert(cells);
//         JFrame frame = new JFrame();
//         frame.getContentPane().add(new JScrollPane(graph));
//         frame.pack();
//         frame.setVisible(true);
//     }
// }
