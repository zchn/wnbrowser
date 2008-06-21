package edu.pku.ymd.wordnet;

public class FileDatabase
{
    public static FileDatabase getInstance(String dictPath);
    public Synset[] getSynset(String WordForm);
    public Synset[] getSynset(int offset);
}