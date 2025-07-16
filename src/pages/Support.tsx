import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Users, 
  Shield,
  ChevronLeft,
  Send,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنتواصل معك في أقرب وقت ممكن",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "اتصل بنا",
      details: ["+963 11 221 7240", "+962 27 390 000"],
      description: "متاح من الأحد إلى الخميس، 8 صباحاً - 5 مساءً"
    },
    {
      icon: Mail,
      title: "راسلنا",
      details: ["info@jude.edu.sy", "support@jpu-er.edu"],
      description: "سنرد على رسالتك خلال 24 ساعة"
    },
    {
      icon: MapPin,
      title: "زرنا",
      details: ["أربد - الأردن", "شارع حماة - جامعة الجزيرة الخاصة"],
      description: "مبنى الخدمات الطلابية - الطابق الأول"
    }
  ];

  const faqItems = [
    {
      question: "ما هي الخدمات المشمولة في التأمين الصحي؟",
      answer: "يشمل التأمين الصحي جميع الخدمات الطبية الأساسية مثل الكشف الطبي، التحاليل المخبرية، الأشعة، والأدوية الأساسية."
    },
    {
      question: "كيف يمكنني تفعيل بطاقة التأمين الخاصة بي؟",
      answer: "يمكنك تفعيل بطاقة التأمين من خلال زيارة مكتب الخدمات الطلابية أو عبر النظام الإلكتروني بعد تسجيل الدخول."
    },
    {
      question: "ما هي المستشفيات المتعاقد معها؟",
      answer: "لدينا شبكة واسعة من المستشفيات والعيادات المتعاقد معها في محافظة إربد والمحافظات المجاورة."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            الدعم والمساعدة
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            نحن هنا لمساعدتك! تواصل معنا للحصول على الدعم والمساعدة في جميع الخدمات الصحية
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              طرق التواصل
            </h2>
            <p className="text-lg text-muted-foreground">
              اختر الطريقة الأنسب للتواصل معنا
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="card-medical group hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-smooth">
                    <contact.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {contact.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    {contact.details.map((detail, idx) => (
                      <p key={idx} className="text-lg font-medium text-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {contact.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 medical-gradient-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              أرسل لنا رسالة
            </h2>
            <p className="text-lg text-muted-foreground">
              املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
            </p>
          </div>

          <Card className="card-medical">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-right block">الاسم الكامل</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      value={formData.name}
                      onChange={handleChange}
                      dir="rtl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="ltr"
                      dir="ltr"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-right block">موضوع الرسالة</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="أدخل موضوع رسالتك"
                    value={formData.subject}
                    onChange={handleChange}
                    dir="rtl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-right block">الرسالة</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="اكتب رسالتك هنا..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    dir="rtl"
                  />
                </div>
                
                <Button type="submit" className="w-full btn-medical">
                  <Send className="w-4 h-4 ml-2" />
                  إرسال الرسالة
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-lg text-muted-foreground">
              إجابات على أكثر الأسئلة شيوعاً حول خدمات التأمين الصحي
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="card-medical">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 hero-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
            <Shield className="w-8 h-8" />
            <h2 className="text-2xl font-bold">للحالات الطارئة</h2>
          </div>
          <p className="text-lg mb-6">
            في حالة الطوارئ الطبية، يرجى الاتصال فوراً على:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 sm:space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse text-xl font-bold">
              <Phone className="w-6 h-6" />
              <span>911 - الإسعاف</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse text-xl font-bold">
              <Phone className="w-6 h-6" />
              <span>+962 27 390 911 - العيادة</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;