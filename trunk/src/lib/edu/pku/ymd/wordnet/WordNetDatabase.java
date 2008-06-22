package edu.pku.ymd.wordnet;

public class WordNetDatabase
{
    static WordNetDatabase instance;

    ptivate int synsetCacheSize = 500;
    ptivate int offsetCacheSize = 500;    

    private Map<String,Synset[]> synsetCache;
    private Map<String,int> offsetCache;
    
    private WordNetDataBase(){
        synsetCache = new HashMap(synsetCacheSize);
        offsetCache = new HashMap(offsetCacheSize);
    }
    static WordNetDatabase getFileInstance()
    {
        if(instance == null){
            instance = new WordNetDatabase();
            return instance;
        }else{
            return instance;
        }
    }
    //Returns an implementation of this class that can access
    //the WordNet database by searching files on the local file system.
    Synset[] getSynsets(String wordForm)
    {
        if(synsetCache.containsKey(wordForm)){
            return synsetCache.get(wordForm);
        }else{
            FileDatabase filedb = FileDatabase.getInstance();
            InnerSynset[] result;
            if(offsetCache.containsKey(wordForm)){
                result = filedb.getSynsets(offsetCache.get(wordForm));
            }else{
                result = filedb.getSynsets(wordForm);
            }
            Synset[] resSynsets = ConvertInnerToOuter(result);
            AddToCaches(resSynsets);
            return resSynsets;
        }
    }
    
    Synset[] getSynsets(String wordForm, SynsetType type)
    {
        Synset[] result = getSynsets(wordForm);
        int i;
        List<Synset> ret = new ArrayList<Synset>;
        for(i = 0; i < result.length(); i++){
            if(result[i].getType() == type){
                ret.add(result[i]);
            }
        }
        Synset[] retArray = new Wordset[ret.size()];
        ret.toArray(retArray);
        return retArray;
    }

    Synset[] getSynsets(String wordForm, SynsetType type, boolean useMorphology)
    {
        return getSynsets(wordForm,type);
    }

    
    Synset[] ConvertInnerToOuter(InnerSynset[] result)
    {
        int i;
        List<Synset> retList = new ArrayList<Synset>;
        for(i = 0; i < result.length(); i++){
            switch (result[i].getType()){
            case SynsetType.NOUN:
                retList.add(ItoONoun((InnerNounSynset)result[i]));
                break;
                
            case SynsetType.VERB:
                retList.add(ItoOVerb((InnerVerbSynset)result[i]));
                break;
                
            case SynsetType.ADVERB:
                retList.add(ItoOAdverb((InnerAdverbSynset)result[i]));
                break;
                
            case SynsetType.ADJECTIVE:
                retList.add(ItoOAdjective((InnerAdjectiveSynset)result[i]));
                break;
            }
        }
        return ((Synset[])retList.toArray());
    }
    
    NounSynset ItoONoun(InnerNounSynset result)
    {
        NounWordset ret = new NounWordset();
        
    }


    void AddToCaches(Synset[] resSynsets);
}