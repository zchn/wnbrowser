import javax.swing.*;
import java.awt.*;
import java.awt.geom.Rectangle2D;

public class boxTest {
    public static void main(String[] args) {
        JFrame frame = new JFrame();
        Container con;


        
        con=frame.getContentPane(  );
        con.setLayout(new FlowLayout());
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        JButton btnSearch=new JButton("Search");
        JTextField textWord = new JTextField(15);
        JPanel pnlUp = new JPanel();
        JPanel pnlDown = new JPanel();
        JPanel basePnl = new JPanel();

        pnlUp.add(btnSearch);   
        pnlUp.add(textWord);
        pnlDown.add(new TextArea(10,10));
        
        basePnl.add(pnlUp);
        basePnl.add(pnlDown);
        con.add(basePnl);
        frame.validate();
        frame.pack();
        frame.setVisible(true);

    }
}