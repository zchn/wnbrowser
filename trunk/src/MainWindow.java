import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import org.jgraph.*;
import org.jgrapht.*;
import javax.swing.event.*;
import javax.swing.tree.*;

import java.awt.geom.Rectangle2D;

import java.io.File;
import java.util.*;
import java.util.HashMap;
import java.util.Map;

import edu.smu.tspell.wordnet.*;

import org.jgraph.graph.DefaultGraphCell;
import org.jgraph.graph.GraphConstants;
import org.jgraph.graph.AttributeMap;
    
import org.jgrapht.ext.JGraphModelAdapter;
import org.jgrapht.graph.ListenableDirectedGraph;
import org.jgrapht.graph.DefaultEdge;




public class MainWindow extends JFrame
{
    private static final int WORDWIDTH=30;
    private static final String WORDNET_DATABASE_DIR_TAG = "wordnet.database.dir";
    
    JTextField txtWord;//输入框
    JButton btnSearch,btnNoun,btnVerb,btnAdj,btnAdv;//搜索按钮和四个词性按钮
    JList lstMeanings;//显示意思的list
    JScrollPane scroRelatedWords;//显示相关词scroll
    JGraph grpWordNet;//网络图
    JGraphModelAdapter grpAdapter;
    ListenableGraph grptWordNet;    
    JTextArea txaMeaning;//下边显示具体意思的TextArea
    WordNetDatabase dbWordNet;
    String currWord;//输入的单词
    Synset[] currSynset;//当前单词Synset型
    SynsetType currProp;
    int currMeaningIdx;//索引
    DefaultMutableTreeNode root;
    JTree tree;
    JSplitPane baseSplit, upSplit, downSplit;
    JSplitPane leftSplit, rightSplit;
    
    

    public MainWindow()//构造函数
    {
        InitWordnetDB();
        setBounds(0,0,1280,1024);
        InitWindowFrame();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        validate();
        setVisible(true);
    }
	
    private void InitWordnetDB() 
    {
        System.setProperty(WORDNET_DATABASE_DIR_TAG,
                           "."
                           + File.separator + "dict");
        dbWordNet = WordNetDatabase.getFileInstance();
    }

    private class SearchBtnHandler implements ActionListener//btnSearch按钮的监视器
    {
        public void actionPerformed( ActionEvent e)
        {
            currWord = txtWord.getText();
            txaMeaning.validate();
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.NOUN);
            currProp = SynsetType.NOUN;
				
            currMeaningIdx = 0;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
            UpdateJGraph();          
        }
    }

    private class EnterHandler implements ActionListener//txtWord按钮的监视器
    { 
        public void actionPerformed(ActionEvent e) 
        { 
            currWord = txtWord.getText();
            txaMeaning.setText(currWord);
            txaMeaning.validate();
            //初始都显示NOUN。的相关内容
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.NOUN);
            currProp = SynsetType.NOUN;
            currMeaningIdx = 0;
            UpdateMeanings();
            UpdateRelatedWords();
            //System.out.println(root);
            //root.removeAllChildren();
				
            UpdateMeaning();
            UpdateJGraph();         
        }
    } 

    private class btnNounHandler implements ActionListener//btnNoun按钮的监视器
    {
        public void actionPerformed( ActionEvent e)
        {
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.NOUN);
            currProp = SynsetType.NOUN;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
            UpdateJGraph();
        }
    }

    private class btnVerbHandler implements ActionListener//btnVerb按钮的监视器
    {
        public void actionPerformed( ActionEvent e)
        {
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.VERB);
            currProp = SynsetType.VERB;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
            UpdateJGraph();
        }
    }


    private class btnAdjHandler implements ActionListener//btnAdj按钮的监视器
    {
        public void actionPerformed( ActionEvent e)
        {
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.ADJECTIVE);
            currProp = SynsetType.ADJECTIVE;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
            UpdateJGraph();
        }
    }

    private class btnAdvHandler implements ActionListener//btnAdb按钮的监视器
    {
        public void actionPerformed( ActionEvent e)
        {
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.ADVERB);
            currProp = SynsetType.ADVERB;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
            UpdateJGraph();
        }
    }


    private class ListHandler implements ListSelectionListener//lstMeanings的监视器
    {
        public void valueChanged(ListSelectionEvent e) 

        {
            currMeaningIdx=lstMeanings.getSelectedIndex();
            UpdateMeaning();
            UpdateJGraph();
        }
    }

    
    
    private void UpdateMeanings()//更新lstMeanings
    {
        int i;
        String[] meaningsList = new String[currSynset.length];
        for(i = 0; i < currSynset.length; i++){
            meaningsList[i] = (currSynset[i].getDefinition());
        }
        lstMeanings.setListData(meaningsList);
        lstMeanings.validate();
    }

    private void UpdateRelatedWords()//更新lstRelatedWords
    {
        try
            {
                int j, i;
                Synset nowSynset;
                nowSynset = currSynset[currMeaningIdx];
                WordSense[] wsAntonyms, wsPertainyms;
                NounSynset[] nsHypernyms, nsHyponyms, nsAttributes;
                VerbSynset[] vsHypernyms;
                currProp = nowSynset.getType();
                String[] strSynonymy;
                //make a JTree
                DefaultMutableTreeNode root = new DefaultMutableTreeNode(currWord);
                root.removeAllChildren();
                if (currProp == SynsetType.NOUN)
                    {
                        DefaultMutableTreeNode synonymy = new DefaultMutableTreeNode("Synonymy");
                        DefaultMutableTreeNode hypernyms = new DefaultMutableTreeNode("Hypernyms");
                        DefaultMutableTreeNode hyponyms = new DefaultMutableTreeNode("Hyponyms");
                        strSynonymy = nowSynset.getWordForms();
                        //synonymy
                        synonymy.removeAllChildren();
                        for (i = 0; i < strSynonymy.length; i++)
                            {
                                //System.out.println(strSynonymy[i]);
                                synonymy.add(new DefaultMutableTreeNode(strSynonymy[i]));
                            }
                        //hypernyms
                        hypernyms.removeAllChildren();
                        nsHypernyms = ((NounSynset)nowSynset).getHypernyms();
                        for (i = 0; i < nsHypernyms.length; i++)
                            {
                                String[] temp;
                                temp = nsHypernyms[i].getWordForms();
                                for (j = 0; j < temp.length; j++)
                                    {
                                        hypernyms.add(new DefaultMutableTreeNode(temp[j]));
                                    }
                            }
                        //hyponyms
                        hyponyms.removeAllChildren();
                        nsHyponyms = ((NounSynset)nowSynset).getHyponyms();
                        for (i = 0; i < nsHyponyms.length; i++)
                            {
                                String[] temp;
                                temp = nsHyponyms[i].getWordForms();
                                for (j = 0; j < temp.length; j++)
                                    {
                                        hyponyms.add(new DefaultMutableTreeNode(temp[j]));
                                    }
                            }
                        root.add(synonymy);
                        root.add(hypernyms);
                        root.add(hyponyms);

                    }

                if (currProp == SynsetType.VERB)
                    {
                        DefaultMutableTreeNode synonymy = new DefaultMutableTreeNode("Synonymy");
                        DefaultMutableTreeNode antonyms = new DefaultMutableTreeNode("Antonyms");
                        DefaultMutableTreeNode hypernyms = new DefaultMutableTreeNode("Hypernyms");
                        strSynonymy = nowSynset.getWordForms();
                        //synonymy
                        synonymy.removeAllChildren();
                        for (i = 0; i < strSynonymy.length; i++)
                            {
                                //		System.out.println(strSynonymy[i]);
                                synonymy.add(new DefaultMutableTreeNode(strSynonymy[i]));
                            }
                        //antonyms
                        antonyms.removeAllChildren();
                        wsAntonyms = ((VerbSynset)nowSynset).getAntonyms(currWord);
                        Synset temp;
                        for (i = 0; i < wsAntonyms.length; i++)
                            {
                                temp = wsAntonyms[i].getSynset();
                                String[] temp2;
                                temp2 = temp.getWordForms();
                                for (j = 0; j < temp2.length; j++)
                                    {
                                        antonyms.add(new DefaultMutableTreeNode(temp2[j]));
                                    }
                            }
                        //hypernyms
                        hypernyms.removeAllChildren();
                        vsHypernyms = ((VerbSynset)nowSynset).getHypernyms();
                        for (i = 0; i < vsHypernyms.length; i++)
                            {
                                String[] temp3;
                                temp3 = vsHypernyms[i].getWordForms();
                                for (j = 0; j < temp3.length; j++)
                                    {
                                        hypernyms.add(new DefaultMutableTreeNode(temp3[j]));
                                    }
                            }
                        root.add(synonymy);
                        root.add(antonyms);
                        root.add(hypernyms);
                    }

                if (currProp == SynsetType.ADJECTIVE)
                    {
                        DefaultMutableTreeNode synonymy = new DefaultMutableTreeNode("Synonymy");
                        DefaultMutableTreeNode antonyms = new DefaultMutableTreeNode("Antonyms");
                        DefaultMutableTreeNode attributes = new DefaultMutableTreeNode("Attributes (from which nouns)");
                        strSynonymy = nowSynset.getWordForms();
                        //synonymy
                        synonymy.removeAllChildren();
                        for (i = 0; i < strSynonymy.length; i++)
                            {
                                //System.out.println(strSynonymy[i]);
                                synonymy.add(new DefaultMutableTreeNode(strSynonymy[i]));
                            }
                        //antonyms
                        antonyms.removeAllChildren();
                        wsAntonyms = ((AdjectiveSynset)nowSynset).getAntonyms(currWord);
                        Synset temp;
                        for (i = 0; i < wsAntonyms.length; i++)
                            {
                                temp = wsAntonyms[i].getSynset();
                                String[] temp2;
                                temp2 = temp.getWordForms();
                                for (j = 0; j < temp2.length; j++)
                                    {
                                        antonyms.add(new DefaultMutableTreeNode(temp2[j]));
                                    }
                            }
                        //attributes
                        attributes.removeAllChildren();
                        nsAttributes = ((AdjectiveSynset)nowSynset).getAttributes();
                        for (i = 0; i < nsAttributes.length; i++)
                            {
                                String[] temp4;
                                temp4 = nsAttributes[i].getWordForms();
                                for (j = 0; j < temp4.length; j++)
                                    {
                                        attributes.add(new DefaultMutableTreeNode(temp4[j]));
                                    }
                            }
                        root.add(synonymy);
                        root.add(antonyms);
                        root.add(attributes);
                    }
                if (currProp == SynsetType.ADVERB)
                    {
                        DefaultMutableTreeNode synonymy = new DefaultMutableTreeNode("Synonymy");
                        DefaultMutableTreeNode antonyms = new DefaultMutableTreeNode("Antonyms ");
                        DefaultMutableTreeNode pertainyms = new DefaultMutableTreeNode("Pertainyms (from which adjectives)");
                        strSynonymy = nowSynset.getWordForms();
                        //synonymy
                        synonymy.removeAllChildren();
                        for (i = 0; i < strSynonymy.length; i++)
                            {
                                //System.out.println(strSynonymy[i]);
                                synonymy.add(new DefaultMutableTreeNode(strSynonymy[i]));
                            }
                        //antonyms
                        antonyms.removeAllChildren();
                        wsAntonyms = ((AdverbSynset)nowSynset).getAntonyms(currWord);
                        Synset temp;
                        for (i = 0; i < wsAntonyms.length; i++)
                            {
                                temp = wsAntonyms[i].getSynset();
                                String[] temp2;
                                temp2 = temp.getWordForms();
                                for (j = 0; j < temp2.length; j++)
                                    {
                                        antonyms.add(new DefaultMutableTreeNode(temp2[j]));
                                    }
                            }
                        //pertainyms
                        pertainyms.removeAllChildren();
                        wsPertainyms = ((AdverbSynset)nowSynset).getPertainyms(currWord);
                        Synset temp5;
                        for (i = 0; i < wsPertainyms.length; i++)
                            {
                                temp5 = wsPertainyms[i].getSynset();
                                String[] temp6;
                                temp6 = temp5.getWordForms();
                                for (j = 0; j < temp6.length; j++)
                                    {
                                        pertainyms.add(new DefaultMutableTreeNode(temp6[j]));
                                    }
                            }
                        root.add(synonymy);
                        root.add(antonyms);
                        root.add(pertainyms);
                    }
                tree = new JTree(root);
                scroRelatedWords = new JScrollPane(tree);
                leftSplit.removeAll();
                leftSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                           new JScrollPane(lstMeanings),
                                           scroRelatedWords);
		
                downSplit.removeAll();
                downSplit = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,
                                           leftSplit,
                                           rightSplit);
			

                baseSplit.removeAll();
                baseSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                           upSplit,
                                           downSplit);
                baseSplit.setDividerSize(0);
                getContentPane().removeAll();
                getContentPane().add(baseSplit);
                baseSplit.validate();
                getContentPane().validate();
            }
        catch (Exception e)
            {
                System.out.println(e);
            }

    }
    private void UpdateMeaning()//更新txaMeaning
    {
        int i;
        String[] temp;
        temp = currSynset[currMeaningIdx].getUsageExamples();
        if (temp.length >= 1)
            {
                txaMeaning.setText(temp[0]);
                for (i = 1; i < temp.length; i++)
                    {
                        txaMeaning.append("\n" + temp[i]);
                    }
                txaMeaning.setEditable(false);
            }
        txaMeaning.validate();
    }

    private void InitWindowFrame()
        
    {

        txtWord = new JTextField(WORDWIDTH);

        btnSearch = new JButton("Search");
        btnNoun = new JButton("Noun.");
        btnVerb = new JButton("Verb.");
        btnAdj = new JButton("Adj.");
        btnAdv = new JButton("Adv.");

        String[] tmp1 = { "Here", "Shows", "the", "meanings", "^_^" };
        String[] tmp2 = { "Here", "Shows", "related", "words", "^_^" };

        lstMeanings = new JList(tmp1);

        grptWordNet = new ListenableDirectedGraph(DefaultEdge.class);//添加Jgraph和Jgrapht       
        grpAdapter = new JGraphModelAdapter(grptWordNet);//添加适配器        
        grpWordNet = new JGraph(grpAdapter);

        txaMeaning = new JTextArea("Here shows the detail meaning and other");
        txaMeaning.setEditable(false);

		
        JPanel pnlInput = new JPanel();
        JPanel pnlProp = new JPanel();

        //添加监视器
        txtWord.addActionListener(new EnterHandler());
        btnSearch.addActionListener(new SearchBtnHandler());        
        btnNoun.addActionListener(new btnNounHandler());
        btnVerb.addActionListener(new btnVerbHandler());
        btnAdj.addActionListener(new btnAdjHandler());
        btnAdv.addActionListener(new btnAdvHandler());
        lstMeanings.addListSelectionListener(new ListHandler());
        lstMeanings.addMouseListener(new MouseAdapter()
            {
                private long clickTime;
                public void mouseReleased(MouseEvent me)
                {
                    if (checkClickTime())
                        {
                            UpdateRelatedWords();

                        }
                }
                public boolean checkClickTime()
                {
                    long nowTime = (new Date()).getTime();
                    if (nowTime - clickTime < 300)
                        {
                            clickTime = nowTime;
                            return true;
                        }
                    clickTime = nowTime;
                    return false;
                }
            });

        pnlInput.add(txtWord);
        pnlInput.add(btnSearch);
        pnlProp.add(btnNoun);
        pnlProp.add(btnVerb);
        pnlProp.add(btnAdj);
        pnlProp.add(btnAdv);

		
        root = new DefaultMutableTreeNode("curWord");
        tree = new JTree(root);
        scroRelatedWords = new JScrollPane(tree);
	
		
        leftSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                   new JScrollPane(lstMeanings),
                                   scroRelatedWords);
        
        rightSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                    new JScrollPane(grpWordNet),
                                    new JScrollPane(txaMeaning));
              

        downSplit = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,
                                   leftSplit,
                                   rightSplit);
        upSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                 pnlInput,
                                 pnlProp);
        upSplit.setDividerSize(0);
        
        
        baseSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                   upSplit,
                                   downSplit);
        baseSplit.setDividerSize(0);
        getContentPane().add(baseSplit);			     
    }

    void UpdateJGraph()
    {
        //grptWordNet.removeAllVertices(grptWordNet.vertexSet());        
        grptWordNet.addVertex(currWord);

        int j,i;
        Synset nowSynset;
        nowSynset = currSynset[currMeaningIdx];
        WordSense[] wsAntonyms;
        NounSynset[] nsHypernyms, nsHyponyms;
        VerbSynset[] vsHypernyms;
        currProp=nowSynset.getType();
        String[] strSynonymy;
        int centerY;
        
        if (currProp==SynsetType.NOUN)
            {
                strSynonymy = nowSynset.getWordForms().clone();
                //synonymy
                for (i = 0; i < strSynonymy.length; i++)                    
                    {
                        if(strSynonymy[i] == currWord){
                            continue;
                        }
                        grptWordNet.addVertex(strSynonymy[i]);
                        grptWordNet.addEdge(currWord,strSynonymy[i]);
                        setVertexColor(strSynonymy[i],Color.red);                        
                        positionVertexAt(strSynonymy[i],200,100+i*100);
                    }
                centerY = 200+i*100;
                positionVertexAt(currWord,200,centerY);
                //hypernyms
                nsHypernyms = ((NounSynset)nowSynset).getHypernyms();                
                for (i = 0; i < nsHypernyms.length; i++)
                    {
                        String[] temp;
                        temp = nsHypernyms[i].getWordForms().clone();
                        for (j = 0; j < temp.length; j++)
                            {                                
                                if(temp[j] == currWord){
                                    continue;
                                }
                                grptWordNet.addVertex(temp[j]);
                                grptWordNet.addEdge(currWord,temp[j]);
                                setVertexColor(temp[j],Color.blue);
                                positionVertexAt(temp[j],50,centerY-100+j*100);
                            }
                    }
                //hyponyms
                nsHyponyms = ((NounSynset)nowSynset).getHyponyms();
                for (i = 0; i < nsHyponyms.length; i++)
                    {
                        String[] temp;
                        temp = nsHyponyms[i].getWordForms().clone();
                        for (j = 0; j < temp.length; j++)
                            {
                                if(temp[j] == currWord){
                                    continue;
                                }
                                grptWordNet.addVertex(temp[j]);
                                grptWordNet.addEdge(currWord,temp[j]);
                                setVertexColor(temp[j],Color.green);                                
                                positionVertexAt(temp[j],400,100+j*100);
                            }
                    }
            }        
        else if (currProp == SynsetType.VERB)
            {
                strSynonymy = nowSynset.getWordForms();
                //synonymy
                for (i = 0; i < strSynonymy.length; i++)
                    {
                        if(strSynonymy[i] == currWord){
                            continue;
                        }
                        grptWordNet.addVertex(strSynonymy[i]);
                        grptWordNet.addEdge(currWord,strSynonymy[i]);
                        positionVertexAt(strSynonymy[i],200,100+i*20);
                    }
                centerY = 100+i*20;
                positionVertexAt(currWord,200,centerY);
                //antonyms
                wsAntonyms = ((VerbSynset)nowSynset).getAntonyms(currWord);
                Synset temp2;
                for (i = 0; i < wsAntonyms.length; i++)
                    {
                        temp2 = wsAntonyms[i].getSynset();
                        String[] temp;
                        temp = temp2.getWordForms();
                        for (j = 0; j < temp.length; j++)
                            {
                                grptWordNet.addVertex(temp[j]);
                                grptWordNet.addEdge(currWord,temp[j]);
                                positionVertexAt(temp[j],200,centerY+50+j*20);
                            }
                    }
                //hypernyms
                vsHypernyms = ((VerbSynset)nowSynset).getHypernyms();
                for (i = 0; i < vsHypernyms.length; i++)
                    {
                        String[] temp;
                        temp = vsHypernyms[i].getWordForms();
                        for (j = 0; j < temp.length; j++)
                            {
                                grptWordNet.addVertex(temp[j]);
                                grptWordNet.addEdge(currWord,temp[j]);
                                positionVertexAt(temp[j],50,centerY-100+j*20);
                            }
                    }
            }
        
        grpWordNet.repaint();
    }

    private void positionVertexAt( Object vertex, int x, int y ) {
        DefaultGraphCell cell = grpAdapter.getVertexCell( vertex );
        AttributeMap attr = cell.getAttributes(  );
        Rectangle2D.Double b = (Rectangle2D.Double) GraphConstants.getBounds( attr );
        GraphConstants.setBounds( attr, new Rectangle( x, y, (int)b.width, (int)b.height ) );
        cell.setAttributes(new AttributeMap(attr));
    }

    private void setVertexColor( Object vertex, Color color ) {
        DefaultGraphCell cell = grpAdapter.getVertexCell(vertex);        
        AttributeMap attr = cell.getAttributes();
        GraphConstants.setBackground(attr, color);
        cell.setAttributes(new AttributeMap(attr));
    }


}       

