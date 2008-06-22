package edu.pku.ymd.wordnet;

public class WordNetDatabase
{
    WordNetDatabase instance;
    
    private WordNetDataBase(){}
    static WordNetDatabase getFileInstance();
    //Returns an implementation of this class that can access
    //the WordNet database by searching files on the local file system.
    Synset[] getSynsets(String wordForm);
    Synset[] getSynsets(String wordForm, SynsetType type)
    {
        Synset[] result = getSynsets(wordForm);
        int i;
        int cnt = 0;
        for(i = 0; i < result.length(); i++){
            if(result[i].getType() == type){
                cnt++;
            }
        }
    }

    Synset[] getSynsets(String wordForm, SynsetType type, boolean useMorphology);
        
}