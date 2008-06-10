import javax.swing.*;
import org.jgraph.*;
import org.jgrapht.*;
import java.awt.*;

import java.awt.geom.Rectangle2D;

import java.util.HashMap;
import java.util.Map;

import org.jgraph.graph.DefaultGraphCell;
import org.jgraph.graph.GraphConstants;
import org.jgraph.graph.AttributeMap;
    
import org.jgrapht.ext.JGraphModelAdapter;
import org.jgrapht.graph.ListenableDirectedGraph;
import org.jgrapht.graph.DefaultEdge;

public class MainWindow extends JFrame
{
    int WORDWIDTH=30;
    
    JTextField txtWord;
    JButton btnSearch,btnNoun,btnVerb,btnAdj,btnAdv;
    JList lstMeanings,lstRelatedWords;
    JGraph grpWordNet;
    JTextArea txaMeaning;
    
    public MainWindow()
    {

        InitWindowFrame();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);        
        pack();
        validate();
        setVisible(true);
    }
            
        
    private void InitWindowFrame()
    {
        txtWord = new JTextField(WORDWIDTH);
        
        btnSearch = new JButton("Search");
        btnNoun = new JButton("Noun.");
        btnVerb = new JButton("Verb.");
        btnAdj = new JButton("Adj.");
        btnAdv = new JButton("Adv.");

        String[] tmp1 = {"Here","Shows","the","meanings","^_^"};
        String[] tmp2 = {"Here","Shows","related","words","^_^"};
        lstMeanings = new JList(tmp1);
        lstRelatedWords = new JList(tmp2);
        grpWordNet = new JGraph();
        txaMeaning = new JTextArea("Here shows the detail meaning and other");

        JSplitPane baseSplit,upSplit,downSplit;
        JSplitPane leftSplit,rightSplit;
        JPanel pnlInput = new JPanel();
        pnlInput.add(txtWord);
        pnlInput.add(btnSearch);        
        JPanel pnlProp = new JPanel();
        pnlProp.add(btnNoun);
        pnlProp.add(btnVerb);
        pnlProp.add(btnAdj);
        pnlProp.add(btnAdv);
        
        leftSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                   new JScrollPane(lstMeanings),
                                   new JScrollPane(lstRelatedWords));                                   
        rightSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                     new JScrollPane(grpWordNet),
                                     new JScrollPane(txaMeaning));
        downSplit = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,
                                   leftSplit,
                                   rightSplit);
        upSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                 pnlInput,
                                 pnlProp);
        baseSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                   upSplit,
                                   downSplit);
        getContentPane().add(baseSplit);
        
        
        
    }
}       
