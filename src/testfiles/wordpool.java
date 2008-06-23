//----------------------------------------------------------------------
// FileName: wordpool.java
// Author: Chen Zhijie
// Contents: A data pool contains all the elements in the wordnet.
//----------------------------------------------------------------------

class WordPool
{

    WordPool();

    String GetSynonymy(String word,char attr);//nvad
    String GetAntonym(String word,char attr);//nvad
    String GetHyponym(String word,char attr);//n
    String GetHypenym(String word,char attr);//nv
    String GetMeronym(String word,char attr);//n
    String GetHolonym(String word,char attr);//n
    String GetAttribute(String word,char attr);//na

    String GetTroponym(String word,char attr);//v
    String GetEntailment(String word,char attr);//v
    String GetCause(String word,char attr);//v
    String GetAlsoSee(String word,char attr);//va

    String GetSimilar(String word,char attr);//a
    String GetRelational(String word,char attr);//a

    String GetDerivedFrom(String word,char attr);//d
    
}