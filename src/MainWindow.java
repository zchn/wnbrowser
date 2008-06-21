import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import org.jgraph.*;
import org.jgrapht.*;
import javax.swing.event.*;

import java.awt.geom.Rectangle2D;

import java.io.File;
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
	JList lstRelatedWords;//��ʾ��شʵ�list
    JGraph grpWordNet;//����ͼ
    JTextArea txaMeaning;//�±���ʾ������˼��TextArea
    WordNetDatabase dbWordNet;
    String currWord;//����ĵ���
    Synset[] currSynset;//��ǰ����Synset��
    SynsetType currProp;
    int currMeaningIdx;//����

    public MainWindow()//���캯��
    {
        InitWordnetDB();
        InitWindowFrame();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);        
        pack();
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
        String[] relatedWordList;
        relatedWordList = currSynset[currMeaningIdx].getWordForms();
        lstRelatedWords.setListData(relatedWordList);
        lstRelatedWords.validate();
    }
    private void UpdateMeaning()//����txaMeaning
    {
        txaMeaning.setText(currSynset[currMeaningIdx].getDefinition());
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
        lstRelatedWords = new JList(tmp2);
        grpWordNet = new JGraph();
        txaMeaning = new JTextArea("Here shows the detail meaning and other");

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

		pnlInput.add(txtWord);
        pnlInput.add(btnSearch);
        pnlProp.add(btnNoun);
        pnlProp.add(btnVerb);
        pnlProp.add(btnAdj);
        pnlProp.add(btnAdv);
		
        leftSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                   new JScrollPane(lstMeanings),
                                   new JScrollPane(lstRelatedWords));
        leftSplit.setDividerLocation(0.5);
        rightSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                     new JScrollPane(grpWordNet),
                                     new JScrollPane(txaMeaning));
        rightSplit.setDividerLocation(0.8);        

        downSplit = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,
                                   leftSplit,
                                   rightSplit);
        upSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                 pnlInput,
                                 pnlProp);
        upSplit.setDividerSize(0);
        downSplit.setDividerLocation(0.4);
        
        baseSplit = new JSplitPane(JSplitPane.VERTICAL_SPLIT,
                                   upSplit,
                                   downSplit);
        baseSplit.setDividerSize(0);
        getContentPane().add(baseSplit);
        
    }
    
}       
