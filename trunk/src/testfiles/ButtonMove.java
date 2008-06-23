import java.awt.*;
import java.awt.event.*;

class MyCanvas extends Canvas
{
	MyCanvas()
	{
	}
	public void paint(Graphics g)
	{
		g.drawLine(0, 0, 400, 400);
	}
}

class WindowButton extends Frame implements ActionListener
{
	WindowButton(String s)
	{
		super(s);
		//Canvas
		MyCanvas c;
		c = new MyCanvas();
		c.setBounds(25, 25, 400, 400);
		//Button
		int i,x,y;
		setLayout(null);
		setBounds(100, 100, 500, 500);
		Button button = new Button("ButtonMove");
		x=10;y=25;
		button.setBounds(x, y, 70, 30);
		button.addActionListener(this);
		add(button);
		add(c);
		setVisible(true);
		validate();
		for (i = 0; i < 400; i++)
		{
			x++;y++;
			button.setBounds(x, y, 70, 30);
			button.repaint();
		}
		addWindowListener(new WindowAdapter()
		{
			public void windowClosing(WindowEvent e)
			{
				System.exit(0);
			}
		});
	}
	public void actionPerformed(ActionEvent e)
	{
		int x, y,i;
		Button ob = (Button)e.getSource();
		x = ob.getX();
		y = ob.getY();
		if (x > 100)
		{
			for (i = 0; i < 400; i++)
			{
				x--; y--;
				ob.setBounds(x, y, 70, 30);
				ob.repaint();
			}
		}
		else
		{
			for (i = 0; i < 400; i++)
			{
				x++; y++;
				ob.setBounds(x, y, 70, 30);
				ob.repaint();
			}
		}

	}
			
}

public class ButtonMove
{
	public static void main(String args[])
	{
		WindowButton win = new WindowButton("窗口");
	}
}

