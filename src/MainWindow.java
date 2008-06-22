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
    
    JTextField txtWord;//�����
    JButton btnSearch,btnNoun,btnVerb,btnAdj,btnAdv;//������ť���ĸ����԰�ť
    JList lstMeanings;//��ʾ��˼��list
    JScrollPane scroRelatedWords;//��ʾ��ش�scroll
    JGraph grpWordNet;//����ͼ
    JGraphModelAdapter grpAdapter;
    ListenableGraph grptWordNet;
    JTextArea txaMeaning;//�±���ʾ������˼��TextArea
    WordNetDatabase dbWordNet;
    String currWord;//����ĵ���
    Synset[] currSynset;//��ǰ����Synset��
    SynsetType currProp;
    int currMeaningIdx;//����
    DefaultMutableTreeNode root;
    JTree tree;


    public MainWindow()//���캯��
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

    private class SearchBtnHandler implements ActionListener//btnSearch��ť�ļ�����
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
        }
    }

    private class EnterHandler implements ActionListener//txtWord��ť�ļ�����
    { 
        public void actionPerformed(ActionEvent e) 
        { 
            currWord = txtWord.getText();
            txaMeaning.setText(currWord);
            txaMeaning.validate();
            //��ʼ����ʾNOUN�����������
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.NOUN);
            currProp = SynsetType.NOUN;
            currMeaningIdx = 0;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();         
        }
    } 

    private class btnNounHandler implements ActionListener//btnNoun��ť�ļ�����
    {
        public void actionPerformed( ActionEvent e)
        {
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.NOUN);
            currProp = SynsetType.NOUN;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
        }
    }
    
    private class btnVerbHandler implements ActionListener//btnVerb��ť�ļ�����
    {
        public void actionPerformed( ActionEvent e)
        {
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.VERB);
            currProp = SynsetType.VERB;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
        }
    }


    private class btnAdjHandler implements ActionListener//btnAdj��ť�ļ�����
    {
        public void actionPerformed( ActionEvent e)
        {
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.ADJECTIVE);
            currProp = SynsetType.ADJECTIVE;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
        }
    }

    private class btnAdvHandler implements ActionListener//btnAdb��ť�ļ�����
    {
        public void actionPerformed( ActionEvent e)
        {
            currSynset = dbWordNet.getSynsets(currWord, SynsetType.ADVERB);
            currProp = SynsetType.ADVERB;
            UpdateMeanings();
            UpdateRelatedWords();
            UpdateMeaning();
        }
    }


    private class ListHandler implements ListSelectionListener//lstMeanings�ļ�����
    {
        public void valueChanged(ListSelectionEvent e) 

        {
            currMeaningIdx=lstMeanings.getSelectedIndex();
            UpdateMeaning();
        }
    }

    
    
    private void UpdateMeanings()//����lstMeanings
    {
        int i;
        String[] meaningsList = new String[currSynset.length];
        for(i = 0; i < currSynset.length; i++){
            meaningsList[i] = (currSynset[i].getDefinition());
        }
        lstMeanings.setListData(meaningsList);
        lstMeanings.validate();
    }

    private void UpdateRelatedWords()//����lstRelatedWords
    {
        int j,i;
        Synset nowSynset;
        nowSynset = currSynset[currMeaningIdx];
        WordSense[] wsAntonyms;
        NounSynset[] nsHypernyms, nsHyponyms;
        VerbSynset[] vsHypernyms;
        currProp=nowSynset.getType();
        String[] strSynonymy;
                            
        root.removeAllChildren();
        //make a JTree
        root.setUserObject(currWord);
                                    
        if (currProp==SynsetType.NOUN)
            {
                DefaultMutableTreeNode synonymy = new DefaultMutableTreeNode("Synonymy");
                DefaultMutableTreeNode hypernyms = new DefaultMutableTreeNode("Hypernyms");
                DefaultMutableTreeNode hyponyms = new DefaultMutableTreeNode("Hyponyms");
                strSynonymy = nowSynset.getWordForms();
                //synonymy
                synonymy.removeAllChildren();
                for (i = 0; i < strSynonymy.length; i++)
                    {
                        System.out.println(strSynonymy[i]);
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
                        System.out.println(strSynonymy[i]);
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
        scroRelatedWords.repaint();
		

    }
    private void UpdateMeaning()//����txaMeaning
    {
        txaMeaning.setText(currSynset[currMeaningIdx].getDefinition());
        txaMeaning.setEditable(false);
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

        String[] tmp1 = {"Here","Shows","the","meanings","^_^"};
        String[] tmp2 = {"Here","Shows","related","words","^_^"};
        
        lstMeanings = new JList(tmp1);
        grpWordNet = new JGraph();
        txaMeaning = new JTextArea("Here shows the detail meaning and other");
        txaMeaning.setEditable(false);

        JSplitPane baseSplit,upSplit,downSplit;
        JSplitPane leftSplit,rightSplit;
        JPanel pnlInput = new JPanel();
        JPanel pnlProp = new JPanel();

        //��Ӽ�����
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
        leftSplit.setDividerLocation(0.2);
        rightSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                    new JScrollPane(grpWordNet),
                                    new JScrollPane(txaMeaning));
        rightSplit.setDividerLocation(0.8);
        grptWordNet = new ListenableDirectedGraph(DefaultEdge.class);//���Jgraph��Jgrapht       
        grpAdapter = new JGraphModelAdapter(grptWordNet);//���������
        

        
        downSplit = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,
                                   leftSplit,
                                   rightSplit);
        upSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                 pnlInput,
                                 pnlProp);
        upSplit.setDividerSize(0);
        downSplit.setDividerLocation(0.2);
        
        baseSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                   upSplit,
                                   downSplit);
        baseSplit.setDividerSize(0);
        getContentPane().add(baseSplit);
        
    }
   
    void updateJGraph()
    {
        
    }

}       
